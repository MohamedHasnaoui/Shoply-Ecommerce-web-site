import { GraphQLError } from "graphql";
import { userService } from "../../services/userService.js";
import { Resolvers, Role, TokenType } from "../types/resolvers-types.js";

import jwt from "jsonwebtoken";
import { GraphQLDateTime } from "graphql-scalars";
import bcrypt from "bcrypt";
import { emailUtil } from "../../../utils/EmailUtil.js";
import { verificationTokenService } from "../../services/VerificationTokenService.js";
import { shoppingCartService } from "../../services/ShoppingCartService.js";
import { Buyer } from "../../entities/index.js";

export const AuthResolver: Resolvers = {
  DateTime: GraphQLDateTime,
  Mutation: {
    signup: async (parent, { input }, context) => {
      const user = await userService.create(input);
      await emailUtil.sendVerificationEmail(user);
      if (user.role === Role.Buyer) {
        const id = await shoppingCartService.create(user as Buyer);
        context.idShoppingCart = id;
      }
      return true;
    },
    signin: async (parent, { input }, context) => {
      const user = await userService.findOneByEmail(input.email);
      if (!user) {
        throw new GraphQLError("Incorrect Credentiels", {
          extensions: { code: "INVALID INPUTS" },
        });
      }
      const correctBwd = await bcrypt.compare(input.password, user.password);
      if (!correctBwd) {
        throw new GraphQLError("Incorrect Credentiels", {
          extensions: { code: "INVALID INPUTS" },
        });
      }
      if (!user.verified) {
        throw new GraphQLError("Email not verified", {
          extensions: { code: "EMAIL_NOT_VERIFIED" },
        });
      }
      const jwtToken = jwt.sign(
        { email: input.email, userId: user.id },
        process.env.JWT_KEY!,
        { expiresIn: "7 days" }
      );
      return { user, jwt: jwtToken };
    },
    verifyEmail: async (parent, { email, token }, context) => {
      const user = await userService.findOneByEmail(email);
      if (!user) {
        throw new GraphQLError("Wrong Credentials", {
          extensions: { code: "BAD USER INPUTS" },
        });
      }
      const verificationToken = await verificationTokenService.findByUserId(
        user.id,
        TokenType.Email
      );
      if (verificationToken == null) {
        throw new GraphQLError("Token not found", {
          extensions: { code: "BAD USER INPUTS" },
        });
      }
      if (verificationToken.expiresAt < new Date()) {
        throw new GraphQLError("Token is invalid or has expired.", {
          extensions: { code: "BAD USER INPUTS" },
        });
      }
      if (verificationToken.token !== token) {
        throw new GraphQLError("Token not valid", {
          extensions: { code: "BAD USER INPUTS" },
        });
      }
      user.verified = true;
      await userService.update(user);
      await verificationTokenService.deleteToken(verificationToken.id);
      return true;
    },
    addResetPasswordRequest: async (parent, { email }, context) => {
      const user = await userService.findOneByEmail(email);
      if (!user) {
        throw new GraphQLError("Wrong Credentials", {
          extensions: { code: "BAD USER INPUTS" },
        });
      }
      await emailUtil.sendResetPasswordEmail(user);
      return true;
    },
    resetPassword: async (parent, { userId, token, password }, context) => {
      const user = await userService.findOneById(userId);
      if (!user) {
        throw new GraphQLError("Wrong Credentials", {
          extensions: { code: "BAD USER INPUTS" },
        });
      }
      const verificationToken = await verificationTokenService.findByUserId(
        user.id,
        TokenType.Password
      );
      if (verificationToken == null) {
        throw new GraphQLError("Token not found", {
          extensions: { code: "BAD USER INPUTS" },
        });
      }
      if (verificationToken.expiresAt < new Date()) {
        throw new GraphQLError("Token is invalid or has expired.", {
          extensions: { code: "BAD USER INPUTS" },
        });
      }
      if (verificationToken.token !== token) {
        throw new GraphQLError("Token not valid", {
          extensions: { code: "BAD USER INPUTS" },
        });
      }
      user.password = await bcrypt.hash(password, 10);
      await userService.update(user);
      await verificationTokenService.deleteToken(verificationToken.id);
      return true;
    },
    updateUser: async (parent, { input }, context) => {
      if (!context.currentUser) {
        throw new GraphQLError("not authorized", {
          extensions: { code: "not authorized" },
        });
      }
      const user = await userService.findOneById(input.id);
      if (!user) {
        throw new GraphQLError("User not found", {
          extensions: { code: "BAD USER INPUTS" },
        });
      }
      if (context.currentUser.userId !== user.id) {
        throw new GraphQLError("not authorized", {
          extensions: { code: "not authorized" },
        });
      }
      user.firstName = input.firstName || user.firstName;
      user.lastName = input.lastName || user.lastName;
      user.address = input.address || user.address;
      user.phoneNumber = input.phoneNumber || user.phoneNumber;
      user.birthDay = input.birthDay || user.birthDay;
      user.profileImg = input.profileImg || user.profileImg;
      user.coverImg = input.coverImg || user.coverImg;
      user.gender = input.gender || user.gender;

      return await userService.update(user);
    },
  },
  Query: {
    currentUser: async (parent, {}, context) => {
      if (!context.currentUser) {
        throw new GraphQLError("not authorized", {
          extensions: { code: "not authorized" },
        });
      }
      return await userService.findOneById(context.currentUser.userId);
    },
  },
};
