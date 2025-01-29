import { GraphQLError } from "graphql";
import { Resolvers } from "../types/resolvers-types";
import { productService } from "../../services/productServices.js";

export const ProductResolver: Resolvers = {
  Query: {
    getProductsByCategory: async (parent, args, context) => {
      if (!context.currentUser) {
        throw new GraphQLError("CANNOT GET CATEGORIES", {
          extensions: { code: "UNAUTHORISED" },
        });
      }
      const products = await productService.getProductByCategory(
        args.categoryId
      );
      return products;
    },
  },
};
