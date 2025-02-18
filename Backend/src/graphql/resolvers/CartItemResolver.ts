import { GraphQLError } from "graphql";
import { Resolvers, Role } from "../types/resolvers-types.js";
import { userService } from "../../services/userService.js";
import { cartItemService } from "../../services/CartItemServices.js";
import { shoppingCartService } from "../../services/ShoppingCartService.js";

export const CartItemResolver: Resolvers = {
  Mutation: {
    creatCartItem: async (parent, { input }, context) => {
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

      const shoppingCart = await shoppingCartService.getShoppingCartByBuyerId(
        user.id
      );
      console.log(
        "--------------Call getShoppingCartByBuyerId in createCartItem Resolver----------------"
      );
      if (!shoppingCart) {
        throw new GraphQLError("Shopping Cart Not Found", {
          extensions: { code: "INVALID_INPUTS" },
        });
      }

      const cartItem = await cartItemService.create(
        shoppingCart.id,
        input.idProduct,
        input.quantity
      );
      console.log(
        "--------------Call cartItemService.create in createCartItem Resolver----------------"
      );

      if (!cartItem) {
        throw new GraphQLError("Failed to create Cart Item", {
          extensions: { code: "INTERNAL_SERVER_ERROR" },
        });
      }

      return cartItem;
    },
    updateCartItem: async (parent, { input }, context) => {
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

      return await cartItemService.update(input, user.id);
    },
    removeCartItem: async (parent, { idCartItem }, context) => {
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

      const deleteResult = await cartItemService.delete(idCartItem);
      return deleteResult.affected !== undefined && deleteResult.affected > 0;
    },
  },
};
