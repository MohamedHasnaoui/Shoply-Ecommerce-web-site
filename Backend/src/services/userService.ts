import { MoreThanOrEqual, Repository, Not } from "typeorm";
import {
  PeriodFilter,
  SignupIpnut,
  UserPaginationResult,
  UsersFilter,
} from "../graphql/types/resolvers-types.js";
import bcrypt from "bcrypt";
import { Role } from "../graphql/types/resolvers-types.js";
import { validateOrReject } from "class-validator";
import { GraphQLError } from "graphql";
import { appDataSource } from "../database/data-source.js";
import { dateUtil } from "../../utils/dateUtil.js";
import { addDays, format, getMonth } from "date-fns";
import { ErrorCode } from "../../utils/Errors.js";
import { User } from "../entities/index.js";
export class UserService {
  constructor(private userRepository: Repository<User>) {}

  async findOneByEmail(email: string) {
    return await this.userRepository.findOneBy({ email });
  }

  async findOneById(id: number) {
    return await this.userRepository.findOneBy({ id });
  }

  async create(signupInput: SignupIpnut) {
    const user = await this.findOneByEmail(signupInput.email);
    if (user) {
      throw new GraphQLError("user already exist in the database", {
        extensions: { code: "BAD USER INPUTS" },
      });
    }
    const newUser = this.userRepository.create({
      ...signupInput,
    });

    try {
      await validateOrReject(newUser);
      newUser.password = await bcrypt.hash(newUser.password, 10);

      return await this.userRepository.save(newUser);
    } catch (errors) {
      console.log("CreateUser:", errors);
      throw new GraphQLError("validation error", {
        extensions: { errors, code: "BAD USER INPUTS" },
      });
    }
  }
  async update(user: User) {
    await this.userRepository.update({ id: user.id }, user);
    return user;
  }
  async remove(user: User) {
    await this.userRepository.remove(user);
    return true;
  }
  async countNewBuyersAndSellers(period?: PeriodFilter) {
    const date = dateUtil.getStartDateOfPeriod(period);
    const registeredBuyers = await this.userRepository.count({
      where: {
        role: Role.Buyer,
        createdAt: period !== undefined ? MoreThanOrEqual(date) : undefined,
      },
    });
    const registeredSeller = await this.userRepository.count({
      where: {
        role: Role.Seller,
        createdAt: period !== undefined ? MoreThanOrEqual(date) : undefined,
      },
    });
    return { registeredBuyers, registeredSeller };
  }
  async getRegisteredUsersByPeriod(period: PeriodFilter, role: Role) {
    const startDate = dateUtil.getStartDateOfPeriod(period);
    const endDate = dateUtil.getEndDateOfPeriod(period);
    const nbRegisteredUsers: { RegiteredUsers: number; date: Date }[] =
      await this.userRepository
        .createQueryBuilder("user")
        .select("COUNT(*)", "RegiteredUsers")
        .addSelect("DATE_TRUNC('day', user.createdAt)", "date")
        .where("user.role = :role", { role })
        .andWhere("user.createdAt >= :date", { date: startDate })
        .groupBy("date")
        .orderBy("date", "ASC")
        .getRawMany();
    const dates = dateUtil.generateDateRange(startDate, addDays(endDate, -1));
    const nbRegisteredUsersMap = new Map<string, number>();
    nbRegisteredUsers.forEach((entry) => {
      nbRegisteredUsersMap.set(
        format(entry.date, "yyyy-MM-dd"),
        entry.RegiteredUsers
      );
    });
    if (period === PeriodFilter.Year) {
      const result = Array(12).fill(0);
      nbRegisteredUsers.forEach((entry) => {
        const month = getMonth(entry.date);
        result[month] = entry.RegiteredUsers;
      });
      return result;
    }
    const finalResult = dates.map(
      (date) => nbRegisteredUsersMap.get(date) ?? 0
    );
    return finalResult;
  }
  async getBestSellers(period?: PeriodFilter) {
    const date = dateUtil.getStartDateOfPeriod(period);
    const result: {
      id: number;
      firstName: string;
      lastName: string;
      selledProducts: number;
    }[] = await this.userRepository
      .createQueryBuilder("user")
      .select("user.id", "id")
      .addSelect("user.firstName", "firstName")
      .addSelect("user.lastName", "lastName")
      .addSelect("COUNT(orderItem.quantity)", "selledProducts")
      .innerJoin("user.products", "product")
      .innerJoin("product.orderItems", "orderItem")
      .where(
        date !== undefined ? "orderItem.createdAt >= :date" : "1=1",
        date !== undefined ? { date } : undefined
      )
      .andWhere("user.role = :role", { role: Role.Seller })
      .groupBy("user.id")
      .orderBy("COUNT(orderItem.quantity)", "DESC")
      .getRawMany();
    return result;
  }
  async getFrequentBuyers(period?: PeriodFilter) {
    const date = dateUtil.getStartDateOfPeriod(period);
    const result: {
      id: number;
      firstName: string;
      lastName: string;
      nbPurchasedProducts: number;
      nbPlacedOrders: number;
    }[] = await this.userRepository
      .createQueryBuilder("user")
      .select("user.id", "id")
      .addSelect("user.firstName", "firstName")
      .addSelect("user.lastName", "lastName")
      .addSelect("COUNT(order.id)", "nbPlacedOrders")
      .addSelect("COUNT(orderItem.quantity)", "nbPurchasedProducts")
      .innerJoin("user.orders", "order")
      .innerJoin("order.orderItems", "orderItem")
      .where("order.createdAt >= :date", { date })
      .andWhere("user.role = :role", { role: Role.Buyer })
      .groupBy("user.id")
      .orderBy("COUNT(orderItem.quantity)", "DESC")
      .orderBy("COUNT(order.id)", "DESC")
      .getRawMany();
    return result;
  }
  async getUsers(input?: UsersFilter): Promise<UserPaginationResult> {
    const pageSize = input.pageSize || 10;
    const pageNb = input.pageNb || 1;
    const users = await this.userRepository.find({
      where: {
        id: input.id || undefined,
        role: input.role || Not(Role.Admin),
        isBlocked: input.isBlocked,
      },
      take: pageSize,
      skip: (pageNb - 1) * pageSize,
    });
    const totalCount = await this.userRepository.count({
      where: {
        id: input.id || undefined,
        role: input.role || Not(Role.Admin),
        isBlocked: input.isBlocked,
      },
    });
    return { users, totalCount };
  }
  async updateUserBlockStatus(userId: number, isBlocked: boolean) {
    const user = await this.findOneById(userId);
    if (!user) {
      throw new GraphQLError("User Not Found", {
        extensions: { code: ErrorCode.BAD_USER_INPUT },
      });
    }
    user.isBlocked = isBlocked;
    await this.update(user);
    return true;
  }
}
export const userService = new UserService(appDataSource.getRepository(User));
