import { GraphQLError } from "graphql";
import { categoryService } from "../../services/categoryServices.js";
import { Resolvers, Role } from "../types/resolvers-types.js";
import { Product } from "../../entities/product/Product.entity.js";
import { appDataSource } from "../../database/data-source.js";
import { userService } from "../../services/userService.js";
import { ErrorCode } from "../../../utils/Errors.js";

const productRepository = appDataSource.getRepository(Product);
export const CategoryResolver: Resolvers = {
  Category: {
    productCount: async (parent) => {
      const count = await productRepository.count({
        where: { category: { id: parent.id } },
      });
      return count;
    },
  },
  Mutation: {
    createCategory: async (parent, { input }, context) => {
      if (!context.currentUser) {
        throw new GraphQLError("You should be logged in", {
          extensions: { code: ErrorCode.UNAUTHENTICATED },
        });
      }
      const user = await userService.findOneById(context.currentUser.userId);
      if (user.role !== Role.Admin) {
        throw new GraphQLError("Unauthorized Action ", {
          extensions: { code: ErrorCode.NOT_AUTHORIZED },
        });
      }
      const category = await categoryService.create(input);

      if (!category) {
        console.log("X-----------Category creation failed-----------X");

        throw new GraphQLError("Server Error", {
          extensions: { code: ErrorCode.INTERNAL_SERVER_ERROR },
        });
      }

      return category;
    },
    updateCategory: async (parent, { input }, context) => {
      if (!context.currentUser) {
        throw new GraphQLError("UNAUTHENTICATED", {
          extensions: { code: ErrorCode.UNAUTHENTICATED },
        });
      }
      const user = await userService.findOneById(context.currentUser.userId);
      if (user.role !== Role.Admin) {
        throw new GraphQLError("UNAUTHORIZED", {
          extensions: { code: ErrorCode.NOT_AUTHORIZED },
        });
      }

      const category = await categoryService.findById(input.id);
      if (!category) {
        throw new GraphQLError("Category not found after update", {
          extensions: { code: ErrorCode.BAD_USER_INPUT },
        });
      }
      category.description = input.description || category.description;
      category.name = input.name || category.name;
      category.image = input.image || category.image;
      category.description = input.description;
      await categoryService.update(category);
      return category;
    },
  },
  Query: {
    getAllCategories: async (parent, z, context) => {
      return await categoryService.getAllCategories();
    },
    getCategory: async (parent, args, context) => {
      const category = await categoryService.findById(args.id);
      if (!category) {
        throw new GraphQLError("Category not found", {
          extensions: { code: ErrorCode.BAD_USER_INPUT },
        });
      }

      return category;
    },
  },
};
