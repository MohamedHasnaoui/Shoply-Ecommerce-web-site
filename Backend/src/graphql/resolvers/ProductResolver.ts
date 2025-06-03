import { GraphQLError } from "graphql";
import { Resolvers, Role } from "../types/resolvers-types.js";
import { productService } from "../../services/productServices.js";
import { userService } from "../../services/userService.js";
import { Seller } from "../../entities";
import { categoryService } from "../../services/categoryServices.js";
import { ErrorCode } from "../../../utils/Errors.js";

export const ProductResolver: Resolvers = {
  Product: {
    totalOrders: async (parent, {}, context) => {
      return await productService.countTotalSales(parent.id);
    },
  },
  Mutation: {
    createProduct: async (parent, { input }, context) => {
      if (!context.currentUser) {
        throw new GraphQLError("UNAUTHORISED", {
          extensions: { code: ErrorCode.UNAUTHENTICATED },
        });
      }
      const user = await userService.findOneById(context.currentUser.userId);
      if (user.role !== Role.Seller) {
        throw new GraphQLError("UNAUTHORIZED", {
          extensions: { code: ErrorCode.NOT_AUTHORIZED },
        });
      }
      const seller = user as Seller;
      return await productService.create(input, seller);
    },
    updateProduct: async (parent, { input }, context) => {
      if (!context.currentUser) {
        throw new GraphQLError("CANNOT UPDATE PRODUCT", {
          extensions: { code: ErrorCode.UNAUTHENTICATED },
        });
      }
      const product = await productService.findById(input.id);
      console.log(product);
      if (product === null) {
        throw new GraphQLError("Product Not Found", {
          extensions: { code: ErrorCode.BAD_USER_INPUT },
        });
      }
      if (product.owner.id != context.currentUser.userId) {
        throw new GraphQLError("CANNOT UPDATE PRODUCT", {
          extensions: { code: ErrorCode.NOT_AUTHORIZED },
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
          extensions: { code: ErrorCode.UNAUTHENTICATED },
        });
      }
      const product = await productService.findById(productId);
      if (product.owner.id != context.currentUser.userId) {
        throw new GraphQLError("CANNOT DELETE PRODUCT", {
          extensions: { code: ErrorCode.NOT_AUTHORIZED },
        });
      }
      return await productService.remove(product);
    },
    incrementQuantity: async (parent, { addedQte, productId }, context) => {
      if (!context.currentUser) {
        throw new GraphQLError("CANNOT UPDATE PRODUCT", {
          extensions: { code: ErrorCode.UNAUTHENTICATED },
        });
      }
      const product = await productService.findById(productId);
      if (product === null) {
        throw new GraphQLError("Product Not Found", {
          extensions: { code: ErrorCode.BAD_USER_INPUT },
        });
      }
      if (product.owner.id != context.currentUser.userId) {
        throw new GraphQLError("CANNOT UPDATE PRODUCT", {
          extensions: { code: ErrorCode.NOT_AUTHORIZED },
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
      const product = await productService.findById(id);
      if (product === null) {
        throw new GraphQLError("Product Not Found", {
          extensions: { code: ErrorCode.BAD_USER_INPUT },
        });
      }
      return product;
    },
    getAllMyProducts: async (parent, { input }, context) => {
      if (!context.currentUser) {
        throw new GraphQLError("UNAUTHORISED", {
          extensions: { code: ErrorCode.UNAUTHENTICATED },
        });
      }
      const user = await userService.findOneById(context.currentUser.userId);
      if (user.role !== Role.Seller) {
        throw new GraphQLError("UNAUTHORISED", {
          extensions: { code: ErrorCode.NOT_AUTHORIZED },
        });
      }
      return await productService.getAllBySellerId(context.currentUser.userId, {
        ...input,
      });
    },
    getMyProductsStatistics: async (parent, args, context) => {
      if (!context.currentUser) {
        throw new GraphQLError("UNAUTHORISED", {
          extensions: { code: ErrorCode.UNAUTHENTICATED },
        });
      }
      const user = await userService.findOneById(context.currentUser.userId);
      if (user.role !== Role.Seller) {
        throw new GraphQLError("UNAUTHORISED", {
          extensions: { code: ErrorCode.NOT_AUTHORIZED },
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
    getSellerTopProducts: async (parent, { nbProduct }, context) => {
      if (!context.currentUser) {
        throw new GraphQLError("UNAUTHORISED", {
          extensions: { code: ErrorCode.UNAUTHENTICATED },
        });
      }
      const user = await userService.findOneById(context.currentUser.userId);
      if (user.role !== Role.Seller) {
        throw new GraphQLError("UNAUTHORISED", {
          extensions: { code: ErrorCode.NOT_AUTHORIZED },
        });
      }
      return await productService.getTopSellingProductsBySellerId(
        context.currentUser.userId,
        nbProduct
      );
    },
    getTopSellingProducts: async (parent, { input }, context) => {
      return await productService.getTopSellingProducts(input);
    },
  },
};
