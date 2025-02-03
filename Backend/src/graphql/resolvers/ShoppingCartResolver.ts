import { GraphQLError } from "graphql";
import { shoppingCartService } from "../../services/ShoppingCartService.js";
import { Resolvers, Role } from "../types/resolvers-types.js";
import { userService } from "../../services/userService.js";

export const ShoppingCartResolver: Resolvers = {
  Query: {
    getShoppingCart: async (parent, args, context) => {
      if (!context.currentUser || !context.currentUser.userId) {
        throw new GraphQLError("UNAUTHORIZED", {
          extensions: { code: "UNAUTHORIZED" },
        });
      }

      const user = await userService.findOneById(context.currentUser.userId);
      if (!user) {
        throw new GraphQLError("User not found", {
          extensions: { code: "NOT_FOUND" },
        });
      }

      if (user.role !== Role.Buyer) {
        throw new GraphQLError("UNAUTHORIZED", {
          extensions: { code: "UNAUTHORIZED" },
        });
      }

      const shoppingCart = await shoppingCartService.getShoppingCartByBuyerId(
        context.currentUser.userId
      );
      if (!shoppingCart) {
        throw new GraphQLError("ShoppingCart not found", {
          extensions: { code: "NOT_FOUND" },
        });
      }

      return shoppingCart;
    },
  },
};
