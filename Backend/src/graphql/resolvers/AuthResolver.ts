import { GraphQLError } from "graphql";
import { userService } from "../../services/userService.js";
import { Resolvers, Role, TokenType } from "../types/resolvers-types.js";
import jwt from "jsonwebtoken";
import { GraphQLDateTime } from "graphql-scalars";
import bcrypt from "bcrypt";
import { EmailUtil, emailUtil } from "../../../utils/EmailUtil.js";
import { verificationTokenService } from "../../services/VerificationTokenService.js";
import { shoppingCartService } from "../../services/ShoppingCartService.js";
import { Buyer } from "../../entities/index.js";
import { whishListService } from "../../services/WhishListService.js";
import { ErrorCode } from "../../../utils/Errors.js";

export const AuthResolver: Resolvers = {
  DateTime: GraphQLDateTime,
  Mutation: {
    signup: async (parent, { input }, context) => {
      const user = await userService.findOneByEmail(input.email);
      if (user) {
        if (!user.verified) {
          await userService.remove(user);
        } else {
          throw new GraphQLError("user already exist in the database", {
            extensions: { code: ErrorCode.BAD_USER_INPUT },
          });
        }
      }
      const newUser = await userService.create(input);
      await emailUtil.sendVerificationEmail(newUser.email);
      if (newUser.role === Role.Buyer) {
        const id = await shoppingCartService.create(newUser as Buyer);
        context.idShoppingCart = id;
        await whishListService.create(user as Buyer);
      }
      return true;
    },
    signin: async (parent, { input }, context) => {
      const user = await userService.findOneByEmail(input.email);
      if (!user) {
        throw new GraphQLError("Incorrect Credentiels", {
          extensions: { code: ErrorCode.BAD_USER_INPUT },
        });
      }
      const correctBwd = await bcrypt.compare(input.password, user.password);
      if (!correctBwd) {
        throw new GraphQLError("Incorrect Credentiels", {
          extensions: { code: ErrorCode.BAD_USER_INPUT },
        });
      }
      // if (!user.verified) {
      //   throw new GraphQLError("Email not verified", {
      //     extensions: { code: "EMAIL_NOT_VERIFIED" },
      //   });
      // }
      const jwtToken = jwt.sign(
        { email: input.email, userId: user.id },
        process.env.JWT_KEY!,
        { expiresIn: "7 days" }
      );
      // await whishListService.create(user as Buyer);

      return { user, jwt: jwtToken };
    },
    verifyEmail: async (parent, { email, token }, context) => {
      const user = await userService.findOneByEmail(email);
      if (!user) {
        throw new GraphQLError("Wrong Credentials", {
          extensions: { code: ErrorCode.BAD_USER_INPUT },
        });
      }
      if (user.verified) {
        throw new GraphQLError("Already verified", {
          extensions: { code: ErrorCode.BAD_USER_INPUT },
        });
      }
      const verificationToken = await verificationTokenService.findByUserId(
        user.id,
        TokenType.Email
      );
      if (verificationToken == null) {
        throw new GraphQLError("Token not found", {
          extensions: { code: ErrorCode.BAD_USER_INPUT },
        });
      }
      if (verificationToken.expiresAt < new Date()) {
        throw new GraphQLError("Token is invalid or has expired.", {
          extensions: { code: ErrorCode.BAD_USER_INPUT },
        });
      }
      if (verificationToken.token !== token) {
        throw new GraphQLError("Token not valid", {
          extensions: { code: ErrorCode.BAD_USER_INPUT },
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
          extensions: { code: ErrorCode.BAD_USER_INPUT },
        });
      }
      await emailUtil.sendResetPasswordEmail(user);
      return true;
    },
    resetPassword: async (parent, { userId, token, password }, context) => {
      const user = await userService.findOneById(userId);
      if (!user) {
        throw new GraphQLError("Wrong Credentials", {
          extensions: { code: ErrorCode.BAD_USER_INPUT },
        });
      }
      const verificationToken = await verificationTokenService.findByUserId(
        user.id,
        TokenType.Password
      );
      if (verificationToken == null) {
        throw new GraphQLError("Token not found", {
          extensions: { code: ErrorCode.BAD_USER_INPUT },
        });
      }
      if (verificationToken.expiresAt < new Date()) {
        throw new GraphQLError("Token is invalid or has expired.", {
          extensions: { code: ErrorCode.BAD_USER_INPUT },
        });
      }
      if (verificationToken.token !== token) {
        throw new GraphQLError("Token not valid", {
          extensions: { code: ErrorCode.BAD_USER_INPUT },
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
          extensions: { code: ErrorCode.UNAUTHENTICATED },
        });
      }
      const user = await userService.findOneById(context.currentUser.userId);
      if (!user) {
        throw new GraphQLError("User not found", {
          extensions: { code: ErrorCode.NOT_FOUND },
        });
      }
      user.firstName = input.firstName || user.firstName;
      user.lastName = input.lastName || user.lastName;
      user.country = input.country || user.country;
      user.city = input.city || user.city;
      user.street = input.street || user.street;
      user.postalCode = input.postalCode || user.postalCode;
      user.phoneNumber = input.phoneNumber || user.phoneNumber;
      user.birthDay = input.birthDay || user.birthDay;
      user.profileImg = input.profileImg || user.profileImg;
      user.coverImg = input.coverImg || user.coverImg;
      user.gender = input.gender || user.gender;
      if (input.password) {
        user.password = await bcrypt.hash(input.password, 10);
      }

      return await userService.update(user);
    },
    VerificationEmailRequest: async (parent, { email }, context) => {
      await emailUtil.sendVerificationEmail(email);
      return true;
    },
  },
  Query: {
    currentUser: async (parent, {}, context) => {
      if (!context.currentUser) {
        throw new GraphQLError(ErrorCode.UNAUTHENTICATED, {
          extensions: { code: ErrorCode.UNAUTHENTICATED },
        });
      }
      return await userService.findOneById(context.currentUser.userId);
    },
    getUserById: async (parent, { id }, context) => {
      return await userService.findOneById(id);
    },
  },
};
