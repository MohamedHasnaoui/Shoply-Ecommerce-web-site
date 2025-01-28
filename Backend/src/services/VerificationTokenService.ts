import { Repository } from "typeorm";
import { VerificationToken } from "../entities/verificationToken/VerificationToken.entity.js";
import { userService, UserService } from "./UserService.js";
import { GraphQLError } from "graphql";
import { validateOrReject } from "class-validator";
import { appDataSource } from "../database/data-source.js";

export class VerificationTokenService {
  constructor(
    private verificationTokenRepository: Repository<VerificationToken>,
    private userService: UserService
  ) {}
  async createToken(token: string, userId: number) {
    const user = await this.userService.findOneById(userId);
    if (user == null) {
      throw new GraphQLError("User not found", {
        extensions: { code: "BAD_USER_INPUTS" },
      });
    }
    const verificationToken = await this.findByUserId(userId);
    if (verificationToken != null) {
      return await this.verificationTokenRepository.remove(verificationToken);
    }
    const newVerificationToken = this.verificationTokenRepository.create({
      token,
      user,
    });
    try {
      await validateOrReject(newVerificationToken);
      return await this.verificationTokenRepository.save(newVerificationToken);
    } catch (errors) {
      throw new GraphQLError("validation error", {
        extensions: { errors, code: "BAD USER INPUTS" },
      });
    }
  }
  async findByUserId(userId: number) {
    const user = await this.userService.findOneById(userId);
    return this.verificationTokenRepository.findOne({ where: { user: user } });
  }
  async deleteToken(tokenId: number) {
    const token = await this.verificationTokenRepository.findOneBy({
      id: tokenId,
    });
    if (token == null) {
      throw new GraphQLError("Token not found", {
        extensions: { code: "BAD_USER_INPUTS" },
      });
    }
    return await this.verificationTokenRepository.remove(token);
  }
}

export const verificationTokenService = new VerificationTokenService(
  appDataSource.getRepository(VerificationToken),
  userService
);
