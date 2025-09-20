import { Resolvers } from "../types/resolvers-types.js";
import { cartItemController } from "../../controllers/CartItemController.js"; // Import the new controller

export const CartItemResolver: Resolvers = {
  Mutation: {
    creatCartItem: cartItemController.creatCartItem.bind(cartItemController),
    updateCartItem: cartItemController.updateCartItem.bind(cartItemController),
    removeCartItem: cartItemController.removeCartItem.bind(cartItemController),
  },
};