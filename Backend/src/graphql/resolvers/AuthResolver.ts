import { GraphQLError } from "graphql";
import { userService } from "../../services/userService.js";
import { Resolvers } from "../types/resolvers-types";
import jwt from "jsonwebtoken";
import { GraphQLDateTime } from "graphql-scalars";
import bcrypt from "bcrypt";
import { emailUtil, SendEmailInput } from "../../../utils/EmailUtil.js";
export const AuthResolver: Resolvers = {
  DateTime: GraphQLDateTime,
  Mutation: {
    signup: async (parent, { input }, context) => {
      const user = await userService.create(input);

      const jwtToken = jwt.sign(
        { email: input.email, userId: user.id },
        process.env.JWT_KEY!,
        { expiresIn: "7 days" }
      );

      if (!user || jwtToken === "") {
        throw new GraphQLError("user is null");
      }
      const emailInput: SendEmailInput = {
        emailTitle: "Welcome to Shoply, we're glad to have you with us",
        subject: "Email Confirmation",
        messageBody: "<p>confirm your Email</p>",
        RECIPIENT_EMAIL: input.email,
      };
      await emailUtil.sendEmail(emailInput);
      return { user, jwt: jwtToken };
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
      const jwtToken = jwt.sign(
        { email: input.email, userId: user.id },
        process.env.JWT_KEY!,
        { expiresIn: "7 days" }
      );
      return { user, jwt: jwtToken };
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
