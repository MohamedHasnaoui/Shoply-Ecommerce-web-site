import { Repository } from "typeorm";
import { User } from "../entities/index.js";
import { SignupIpnut } from "../graphql/types/resolvers-types.js";
import bcrypt from "bcrypt";
import { validateOrReject, ValidationError } from "class-validator";
import { GraphQLError } from "graphql";
import { appDataSource } from "../database/data-source.js";
export class UserService {
  constructor(private userRepository: Repository<User>) {}

  async findOneByEmail(email: string) {
    return await this.userRepository.findOneBy({ email });
  }

  async findOneById(id: number) {
    return await this.userRepository.findOneBy({ id });
  }

  async create(signupInput: SignupIpnut) {
    const newUser = this.userRepository.create({ ...signupInput });
    try {
      await validateOrReject(newUser);
      newUser.password = await bcrypt.hash(newUser.password, 10);
      return await this.userRepository.save(newUser);
    } catch (errors) {
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
}
export const userService = new UserService(appDataSource.getRepository(User));
