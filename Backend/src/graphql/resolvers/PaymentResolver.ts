import { GraphQLError } from "graphql";
import { Resolvers, Role } from "../types/resolvers-types.js";
import { Buyer } from "../../entities/index.js";
import { userService } from "../../services/userService.js";
import { paymentService } from "../../services/PaymentService.js";
import { shoppingCartService } from "../../services/ShoppingCartService.js";
import { ErrorCode } from "../../../utils/Errors.js";
export const PaymentResolver: Resolvers = {
  Mutation: {
    creatPaymentIntent: async (parent, {}, context) => {
      if (!context.currentUser) {
        throw new GraphQLError("You should be logged in", {
          extensions: { code: ErrorCode.UNAUTHENTICATED },
        });
      }
      const user = await userService.findOneById(context.currentUser.userId);
      if (user.role !== Role.Buyer) {
        throw new GraphQLError("Tou should be a buyer", {
          extensions: { code: ErrorCode.NOT_AUTHORIZED },
        });
      }
      return await paymentService.createPaymentIntent(user.id);
    },
    verifyPayment: async (parent, { sessionId }, context) => {
      return await paymentService.verifyPayment(sessionId);
    },
  },
};
