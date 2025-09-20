import { Resolvers } from "../types/resolvers-types.js";
import { sellerController } from "../../controllers/SellerController.js"; // Import the new controller

export const SellerResolver: Resolvers = {
  Query: {
    getCustomerPastOrderItems:
      sellerController.getCustomerPastOrderItems.bind(sellerController),
  },
};