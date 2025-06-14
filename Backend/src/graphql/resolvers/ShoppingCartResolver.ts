import { GraphQLError } from "graphql";
import { shoppingCartService } from "../../services/ShoppingCartService.js";
import { Resolvers, Role } from "../types/resolvers-types.js";
import { userService } from "../../services/userService.js";
import { ErrorCode } from "../../../utils/Errors.js";

export const ShoppingCartResolver: Resolvers = {
  Query: {
    getShoppingCart: async (parent, args, context) => {
      if (!context.currentUser || !context.currentUser.userId) {
        throw new GraphQLError("You should be logged in", {
          extensions: { code: ErrorCode.UNAUTHENTICATED },
        });
      }

      const user = await userService.findOneById(context.currentUser.userId);
      if (!user) {
        throw new GraphQLError("User not found", {
          extensions: { code: ErrorCode.NOT_FOUND },
        });
      }

      if (user.role !== Role.Buyer) {
        throw new GraphQLError("You should be a buyer", {
          extensions: { code: ErrorCode.NOT_AUTHORIZED },
        });
      }

      const shoppingCart = await shoppingCartService.getShoppingCartByBuyerId(
        context.currentUser.userId
      );
      if (!shoppingCart) {
        console.log("X-----------ShoppingCart not found-----------X");

        throw new GraphQLError("Server Error", {
          extensions: { code: ErrorCode.INTERNAL_SERVER_ERROR },
        });
      }

      return shoppingCart;
    },
  },
  Mutation: {
    cancelShoppingCart: async (parent, args, context) => {
      if (!context.currentUser || !context.currentUser.userId) {
        throw new GraphQLError("You should be logged in", {
          extensions: { code: ErrorCode.UNAUTHENTICATED },
        });
      }

      const user = await userService.findOneById(context.currentUser.userId);
      if (!user) {
        throw new GraphQLError("User not found", {
          extensions: { code: ErrorCode.NOT_FOUND },
        });
      }

      if (user.role !== Role.Buyer) {
        throw new GraphQLError("You should be a buyer", {
          extensions: { code: ErrorCode.NOT_AUTHORIZED },
        });
      }
      return await shoppingCartService.cancelShoppingCart(
        context.currentUser.userId
      );
    },
  },
};
