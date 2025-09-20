import { Resolvers } from "../types/resolvers-types.js";
import { shoppingCartController } from "../../controllers/ShoppingCartController.js"; // Import the new controller

export const ShoppingCartResolver: Resolvers = {
  Query: {
    getShoppingCart: shoppingCartController.getShoppingCart.bind(shoppingCartController),
  },
  Mutation: {
    cancelShoppingCart: shoppingCartController.cancelShoppingCart.bind(shoppingCartController),
  },
};