import { Repository } from "typeorm";
import { VerificationToken } from "../entities/verificationToken/VerificationToken.entity.js";
import { GraphQLError } from "graphql";
import { validateOrReject } from "class-validator";
import { appDataSource } from "../database/data-source.js";
import { TokenType } from "../graphql/types/resolvers-types.js";
import { userService } from "./UserService.js";

export class VerificationTokenService {
  constructor(
    private verificationTokenRepository: Repository<VerificationToken>
  ) {}
  async createToken(email: string, token: string, type: TokenType) {
    const user = await userService.findOneByEmail(email);
    if (user == null) {
      throw new GraphQLError("User not found", {
        extensions: { code: "BAD_USER_INPUTS" },
      });
    }
    const verificationToken = await this.findByUserId(user.id, type);
    if (verificationToken != null) {
      return await this.verificationTokenRepository.remove(verificationToken);
    }
    const newVerificationToken = this.verificationTokenRepository.create({
      token: token,
      user,
      type: type,
      expiresAt: new Date(Date.now() + 3600 * 1000),
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
  async findByUserId(userId: number, type: TokenType) {
    const user = await userService.findOneById(userId);
    return this.verificationTokenRepository.findOne({
      where: { user: user, type },
    });
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
  appDataSource.getRepository(VerificationToken)
);
