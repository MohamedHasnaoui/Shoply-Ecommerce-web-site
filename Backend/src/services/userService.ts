import { Repository } from "typeorm";
import { User } from "../entities/index.js";
import { SignupIpnut } from "../graphql/types/resolvers-types";
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
    const user = await this.findOneByEmail(signupInput.email);
    console.log("inside create");
    if (user) {
      throw new GraphQLError("user already exist in the database", {
        extensions: { code: "BAD USER INPUTS" },
      });
    }
    const newUser = this.userRepository.create({ ...signupInput });
    console.log(newUser.email);
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
}
export const userService = new UserService(appDataSource.getRepository(User));
