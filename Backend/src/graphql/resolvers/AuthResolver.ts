import { GraphQLError } from "graphql";
import { userService } from "../../services/UserService.js";
import { Resolvers } from "../types/resolvers-types";
import jwt from "jsonwebtoken";
import { GraphQLDateTime } from "graphql-scalars";
import bcrypt from "bcrypt";
import { emailUtil, SendEmailInput } from "../../../utils/EmailUtil.js";
import { tokenUtil } from "../../../utils/TokenUtil.js";
import { verificationTokenService } from "../../services/VerificationTokenService.js";
export const AuthResolver: Resolvers = {
  DateTime: GraphQLDateTime,
  Mutation: {
    signup: async (parent, { input }, context) => {
      const user = await userService.create(input);
      emailUtil.sendVerificationEmail(user);
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
        user.id
      );
      if (verificationToken == null) {
        throw new GraphQLError("Token not found", {
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
