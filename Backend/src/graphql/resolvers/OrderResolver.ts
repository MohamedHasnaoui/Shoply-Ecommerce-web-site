import { GraphQLError } from "graphql";
import { orderService } from "../../services/OrderService";
import { Resolvers, Role } from "../types/resolvers-types";
import { userService } from "../../services/UserService";

export const OrderResolver: Resolvers = {
  Mutation: {
    createOrder: async (parent, { paymentId }, context) => {
      if (!context.currentUser) {
        throw new GraphQLError("UNAUTHORIZED", {
          extensions: { code: "UNAUTHORIZED" },
        });
      }
      return await orderService.create(context.currentUser.userId, paymentId);
    },
  },
  Query: {
    getMyOrders: async (parent, { pageNb, pageSize }, context) => {
      if (!context.currentUser) {
        throw new GraphQLError("UNAUTHORIZED", {
          extensions: { code: "UNAUTHORIZED" },
        });
      }
      const user = await userService.findOneById(context.currentUser.userId);
      if (user.role !== Role.Buyer) {
        throw new GraphQLError("UNAUTHORIZED", {
          extensions: { code: "UNAUTHORIZED" },
        });
      }
      return await orderService.findByBuyerId(
        context.currentUser.userId,
        pageNb,
        pageSize
      );
    },
    getOrder(parent, { orderId }, context) {
      if (!context.currentUser) {
        throw new GraphQLError("UNAUTHORIZED", {
          extensions: { code: "UNAUTHORIZED" },
        });
      }
      return orderService.findOneById(orderId);
    },
  },
};
