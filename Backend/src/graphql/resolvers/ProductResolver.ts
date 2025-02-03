import { GraphQLError } from "graphql";
import { Resolvers, Role } from "../types/resolvers-types.js";
import { productService } from "../../services/productServices.js";
import { userService } from "../../services/userService.js";
import { Seller } from "../../entities";
import { categoryService } from "../../services/categoryServices.js";

export const ProductResolver: Resolvers = {
  Mutation: {
    createProduct: async (parent, { input }, context) => {
      if (!context.currentUser) {
        throw new GraphQLError("CANNOT CREATE PRODUCT", {
          extensions: { code: "UNAUTHORISED" },
        });
      }
      const user = await userService.findOneById(context.currentUser.userId);
      if (user.role !== Role.Seller) {
        throw new GraphQLError("CANNOT CREATE PRODUCT", {
          extensions: { code: "UNAUTHORISED" },
        });
      }
      const seller = user as Seller;
      return await productService.create(input, seller);
    },
    updateProduct: async (parent, { input }, context) => {
      if (!context.currentUser) {
        throw new GraphQLError("CANNOT UPDATE PRODUCT", {
          extensions: { code: "UNAUTHORISED" },
        });
      }
      const product = await productService.findById(input.id);
      if (product.owner.id != context.currentUser.userId) {
        throw new GraphQLError("CANNOT UPDATE PRODUCT", {
          extensions: { code: "UNAUTHORISED" },
        });
      }
      product.name = input.name || product.name;
      product.reference = input.reference || product.reference;
      product.description = input.description || product.description;
      product.images = input.images || product.images;
      product.rating = input.rating || product.rating;
      product.quantity = input.quantity || product.quantity;
      product.price = input.price || product.price;
      if (input.categoryId) {
        const category = await categoryService.findById(input.categoryId);
        if (category) product.category = category;
      }
      return await productService.update(product);
    },
    removeProduct: async (parent, { productId }, context) => {
      if (!context.currentUser) {
        throw new GraphQLError("CANNOT DELETE PRODUCT", {
          extensions: { code: "UNAUTHORISED" },
        });
      }
      const product = await productService.findById(productId);
      if (product.owner.id != context.currentUser.userId) {
        throw new GraphQLError("CANNOT DELETE PRODUCT", {
          extensions: { code: "UNAUTHORISED" },
        });
      }
      return await productService.remove(product);
    },
  },
  Query: {
    getProductsByCategory: async (parent, args, context) => {
      return await productService.getByCategory(
        args.categoryId,
        args.pageNb,
        args.pageSize
      );
    },
    getAllProducts: async (parent, args, context) => {
      return productService.getAll(args.pageNb, args.pageSize);
    },
  },
};
