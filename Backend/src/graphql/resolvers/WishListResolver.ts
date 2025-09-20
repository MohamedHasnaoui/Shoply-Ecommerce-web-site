import { Resolvers } from "../types/resolvers-types.js";
import { whishListController } from "../../controllers/WhishListController.js"; // Import the new controller

export const WhishListResolver: Resolvers = {
  Query: {
    getWishList: whishListController.getWishList.bind(whishListController),
    getFilteredWishList: whishListController.getFilteredWishList.bind(whishListController),
  },
  Mutation: {
    addProductToWishList: whishListController.addProductToWishList.bind(whishListController),
    deleteProductFromWishList: whishListController.deleteProductFromWishList.bind(whishListController),
  },
};