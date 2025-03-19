import { GraphQLError } from "graphql";
import {
  ProductsStatistics,
  Resolvers,
  Role,
} from "../types/resolvers-types.js";
import { productService } from "../../services/productServices.js";
import { userService } from "../../services/userService.js";
import { Seller } from "../../entities";
import { categoryService } from "../../services/categoryServices.js";
import { GraphQLDateTime } from "graphql-scalars";

export const ProductResolver: Resolvers = {
  Mutation: {
    createProduct: async (parent, { input }, context) => {
      if (!context.currentUser) {
        throw new GraphQLError("UNAUTHORISED", {
          extensions: { code: "UNAUTHORISED" },
        });
      }
      const user = await userService.findOneById(context.currentUser.userId);
      if (user.role !== Role.Seller) {
        throw new GraphQLError("UNAUTHORISED", {
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
      if (product === null) {
        throw new GraphQLError("Product Not Found", {
          extensions: { code: "INVALID_INPUTS" },
        });
      }
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
    incrementQuantity: async (parent, { addedQte, productId }, context) => {
      if (!context.currentUser) {
        throw new GraphQLError("CANNOT UPDATE PRODUCT", {
          extensions: { code: "UNAUTHORISED" },
        });
      }
      const product = await productService.findById(productId);
      if (product === null) {
        throw new GraphQLError("Product Not Found", {
          extensions: { code: "INVALID_INPUTS" },
        });
      }
      if (product.owner.id != context.currentUser.userId) {
        throw new GraphQLError("CANNOT UPDATE PRODUCT", {
          extensions: { code: "UNAUTHORISED" },
        });
      }
      return await productService.incrementQuantity(productId, addedQte);
    },
  },
  Query: {
    getAllProducts: async (parent, { input }, context) => {
      return await productService.getAll({ ...input });
    },
    getProduct: async (parent, { id }, context) => {
      return await productService.findById(id);
    },
    getAllMyProducts: async (parent, { input }, context) => {
      if (!context.currentUser) {
        throw new GraphQLError("UNAUTHORISED", {
          extensions: { code: "UNAUTHORISED" },
        });
      }
      const user = await userService.findOneById(context.currentUser.userId);
      if (user.role !== Role.Seller) {
        throw new GraphQLError("UNAUTHORISED", {
          extensions: { code: "UNAUTHORISED" },
        });
      }
      return await productService.getAllBySellerId(context.currentUser.userId, {
        ...input,
      });
    },
    getMyProductsStatistics: async (parent, args, context) => {
      if (!context.currentUser) {
        throw new GraphQLError("UNAUTHORISED", {
          extensions: { code: "UNAUTHORISED" },
        });
      }
      const user = await userService.findOneById(context.currentUser.userId);
      if (user.role !== Role.Seller) {
        throw new GraphQLError("UNAUTHORISED", {
          extensions: { code: "UNAUTHORISED" },
        });
      }
      const countAvailable = await productService.countAvailable(
        context.currentUser.userId
      );
      const countOutOfStock = await productService.countOutOfStock(
        context.currentUser.userId
      );
      return { countAvailable, countOutOfStock };
    },
  },
};
