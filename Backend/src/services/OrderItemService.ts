import { In, MoreThanOrEqual, Repository } from "typeorm";
import { CartItem, OrderItem } from "../entities/index.js";
import { orderService } from "./OrderService.js";
import { GraphQLError } from "graphql";
import { validateOrReject } from "class-validator";
import {
  OrderItemFilter,
  OrderItemsListResult,
  OrderItemStatus,
  PeriodFilter,
} from "../graphql/types/resolvers-types.js";
import { appDataSource } from "../database/data-source.js";
import { productService } from "./productServices.js";
import { cartItemService } from "./CartItemServices.js";
import { dateUtil } from "../../utils/dateUtil.js";
import { addDays, format, getMonth } from "date-fns";

export class OrderItemService {
  constructor(private orderItemRepository: Repository<OrderItem>) {}
  async create(cartItem: CartItem, orderId: number) {
    const order = await orderService.findOneById(orderId);

    if (order === null) {
      throw new GraphQLError("Order Not Found", {
        extensions: { code: "INVALID_INPUTS" },
      });
    }
    const product = await productService.findById(cartItem.product.id);
    if (product === null) {
      throw new GraphQLError("Product Not Found", {
        extensions: { code: "INVALID_INPUTS" },
      });
    }
    if (product.quantity < cartItem.quantity) {
      cartItem.quantity = product.quantity;
      await cartItemService.update({
        id: cartItem.id,
        quantity: product.quantity,
      });
      throw new GraphQLError(
        "Product quantity is less than the quantity you want to order: " +
          product.name,
        {
          extensions: { code: "INVALID_INPUTS" },
        }
      );
    }
    product.quantity -= cartItem.quantity;
    const orderItem = this.orderItemRepository.create({
      order,
      productId: product.id,
      product: product,
      quantity: cartItem.quantity,
      status: OrderItemStatus.Pending,
      price: cartItem.price,
    });
    try {
      await validateOrReject(orderItem);
      await this.orderItemRepository.save(orderItem);
      await productService.update(product);
      return orderItem;
    } catch (errors) {
      throw new GraphQLError("validation error", {
        extensions: { errors, code: "BAD USER INPUTS" },
      });
    }
  }
  async update(orderItem: OrderItem) {
    await this.orderItemRepository.update({ id: orderItem.id }, orderItem);
    const order = await orderService.findOneById(orderItem.order.id);
    await orderService.update(order);
    return orderItem;
  }
  async findOneById(id: number) {
    return await this.orderItemRepository.findOne({
      where: { id },
      relations: { product: { owner: true }, order: { buyer: true } },
    });
  }
  async findBySellerId(
    sellerId: number,
    input: OrderItemFilter
  ): Promise<OrderItemsListResult> {
    const date = dateUtil.getStartDateOfPeriod(input.period);
    const orderItems = await this.orderItemRepository.find({
      where: {
        product: { owner: { id: sellerId } },
        status: input.status,
        createdAt:
          input?.period !== undefined ? MoreThanOrEqual(date) : undefined,
      },
      relations: { product: true, order: { buyer: true } },
      order: { createdAt: "DESC" },
      take: input.pageNb ? input?.pageSize : 15,
      skip:
        input.pageNb && input.pageSize
          ? (input?.pageNb - 1) * input?.pageSize
          : undefined,
    });
    const count = await this.orderItemRepository.count({
      where: {
        product: { owner: { id: sellerId } },
        status: input.status,
        createdAt:
          input?.period !== undefined ? MoreThanOrEqual(date) : undefined,
      },
      order: { id: "DESC" },
    });
    console.log(orderItems[0].order);
    return { orderItems, count };
  }
  async findByBuyerIdAndProductId(
    buyerId: number,
    productId: number,
    status?: OrderItemStatus
  ) {
    return await this.orderItemRepository.findOne({
      where: {
        product: { id: productId },
        order: { buyer: { id: buyerId } },
        status,
      },
      order: { createdAt: "DESC" },
    });
  }
  async findBySellerIdAndCustomerId(sellerId: number, customerID: number) {
    return await this.orderItemRepository.find({
      where: {
        product: { owner: { id: sellerId } },
        order: { buyer: { id: customerID } },
      },
      relations: { product: true },
      order: { createdAt: "DESC" },
    });
  }
  async countByProductId(productId: number) {
    return await this.orderItemRepository.count({
      where: { product: { id: productId } },
    });
  }
  async updateStatus(
    orderItem: OrderItem,
    status: OrderItemStatus,
    NextStatus: Record<OrderItemStatus, OrderItemStatus[]>
  ) {
    if (NextStatus[orderItem.status].includes(status)) {
      orderItem.status = status;
      orderItem.updatedAt = new Date();
      return await this.update(orderItem);
    } else {
      throw new GraphQLError("You Can Not Update To This Status", {
        extensions: { code: "INVALID_INPUTS" },
      });
    }
  }
  async countBySellerAndStatus(
    sellerId: number,
    statusArray: OrderItemStatus[],
    period?: PeriodFilter
  ) {
    const date = dateUtil.getStartDateOfPeriod(period);
    return this.orderItemRepository.count({
      where: {
        product: { owner: { id: sellerId } },
        status: In(statusArray),
        updatedAt: period !== undefined ? MoreThanOrEqual(date) : undefined,
      },
    });
  }
  async countAllBySeller(sellerId: number, period?: PeriodFilter) {
    const date = dateUtil.getStartDateOfPeriod(period);
    return this.orderItemRepository.count({
      where: {
        product: { owner: { id: sellerId } },
        createdAt: period !== undefined ? MoreThanOrEqual(date) : undefined,
      },
    });
  }
  async totalEarning(
    sellerId: number,
    period?: PeriodFilter
  ): Promise<{ totalEarnings: number }> {
    const date = dateUtil.getStartDateOfPeriod(period);
    const res = await this.orderItemRepository
      .createQueryBuilder("orderItem")
      .select("COALESCE(SUM(orderItem.price), 0)", "totalEarnings")
      .innerJoin("orderItem.product", "product")
      .innerJoin("product.owner", "owner")
      .where("owner.id = :sellerId", { sellerId })
      .andWhere(period !== undefined ? "orderItem.updatedAt >= :date" : "1=1", {
        date,
      })
      .andWhere("orderItem.status = :status", {
        status: OrderItemStatus.Delivered,
      })
      .getRawOne();
    return res;
  }
  async totalNewCustomers(
    sellerId: number,
    period?: PeriodFilter
  ): Promise<{ totalNewCustomers: number }> {
    const date = dateUtil.getStartDateOfPeriod(period);
    return await this.orderItemRepository
      .createQueryBuilder("orderItem")
      .select("COUNT(DISTINCT buyer.id)", "totalNewCustomers")
      .innerJoin("orderItem.product", "product")
      .innerJoin("product.owner", "owner")
      .innerJoin("orderItem.order", "order")
      .innerJoin("order.buyer", "buyer")
      .where("owner.id = :sellerId", { sellerId })
      .andWhere(period !== undefined ? "orderItem.createdAt >= :date" : "1=1", {
        date,
      })
      .andWhere("orderItem.status Not IN (:...status)", {
        status: [OrderItemStatus.Failed, OrderItemStatus.Cancelled],
      })
      .getRawOne();
  }
  async getPeriodEarningList(
    sellerId: number,
    period: PeriodFilter
  ): Promise<Array<number>> {
    const startDate = dateUtil.getStartDateOfPeriod(period);
    const endDate = dateUtil.getEndDateOfPeriod(period);
    const earnings: { totalEarnings: number; date: Date }[] =
      await this.orderItemRepository
        .createQueryBuilder("orderItem")
        .select("SUM(orderItem.price)", "totalEarnings")
        .addSelect("DATE_TRUNC('day', orderItem.updatedAt)", "date")
        .innerJoin("orderItem.product", "product")
        .innerJoin("product.owner", "owner")
        .where("owner.id = :sellerId", { sellerId })
        .andWhere("orderItem.updatedAt >= :date", { date: startDate })
        .andWhere("orderItem.status = :status", {
          status: OrderItemStatus.Delivered,
        })
        .groupBy("date")
        .orderBy("date", "ASC")
        .getRawMany();
    const dates = dateUtil.generateDateRange(startDate, addDays(endDate, -1));
    const earningsMap = new Map<string, number>();
    earnings.forEach((entry) => {
      earningsMap.set(format(entry.date, "yyyy-MM-dd"), entry.totalEarnings);
    });
    if (period === PeriodFilter.Year) {
      const result = Array(12).fill(0);
      earnings.forEach((entry) => {
        const month = getMonth(entry.date);
        result[month] = entry.totalEarnings;
      });
      return result;
    }
    const finalResult = dates.map((date) => earningsMap.get(date) ?? 0);
    return finalResult;
  }
  async getOrderCountPeriodList(
    sellerId: number,
    period: PeriodFilter
  ): Promise<Array<number>> {
    const startDate = dateUtil.getStartDateOfPeriod(period);
    const endDate = dateUtil.getEndDateOfPeriod(period);
    const orders: { totalOrders: number; date: Date }[] =
      await this.orderItemRepository
        .createQueryBuilder("orderItem")
        .select("Count(*)", "totalOrders")
        .addSelect("DATE_TRUNC('day', orderItem.createdAt)", "date")
        .innerJoin("orderItem.product", "product")
        .innerJoin("product.owner", "owner")
        .where("owner.id = :sellerId", { sellerId })
        .andWhere("orderItem.updatedAt >= :date", { date: startDate })
        .groupBy("date")
        .orderBy("date", "ASC")
        .getRawMany();
    const dates = dateUtil.generateDateRange(startDate, addDays(endDate, -1));
    const ordersMap = new Map<string, number>();
    orders.forEach((entry) => {
      ordersMap.set(format(entry.date, "yyyy-MM-dd"), entry.totalOrders);
    });
    if (period === PeriodFilter.Year) {
      const result = Array(12).fill(0);
      orders.forEach((entry) => {
        const month = getMonth(entry.date);
        result[month] = entry.totalOrders;
      });
      return result;
    }
    const finalResult = dates.map((date) => ordersMap.get(date) ?? 0);
    return finalResult;
  }
}

export const orderItemService = new OrderItemService(
  appDataSource.getRepository(OrderItem)
);
