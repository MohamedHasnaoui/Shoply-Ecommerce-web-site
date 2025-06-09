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
      try {
        const user = await userService.findOneById(context.currentUser.userId);
        if (user.role !== Role.Admin) {
          throw new GraphQLError("UNAUTHORIZED", {
            extensions: { code: ErrorCode.NOT_AUTHORIZED },
          });
        }
        const category = await categoryService.create(input);

        if (!category) {
          throw new GraphQLError("Category creation failed", {
            extensions: { code: "CATEGORY_CREATION_FAILED" },
          });
        }

        return category;
      } catch (error) {
        if (error instanceof GraphQLError) {
          throw error;
        }

        throw new GraphQLError(
          "An unexpected error occurred while adding category",
          { extensions: { code: "UNKNOWN_ERROR", error } }
        );
      }
    },
    updateCategory: async (parent, { input }, context) => {
      const updatedCategory = await categoryService.update(input);

      if (!updatedCategory) {
        throw new GraphQLError("Category update failed", {
          extensions: { code: "INTERNAL_SERVER_ERROR" },
        });
      }

      const category = await categoryService.findById(input.id);

      if (!category) {
        throw new GraphQLError("Category not found after update", {
          extensions: { code: "NOT_FOUND" },
        });
      }

      return category;
    },
  },
  Query: {
    getAllCategories: async (parent, args, context) => {
      const categories = await categoryService.getAllCategories();
      if (!categories || categories.length === 0) {
        throw new GraphQLError("No categories available", {
          extensions: { code: "NO_CATEGORIES_FOUND" },
        });
      }

      return categories;
    },
    getCategory: async (parent, args, context) => {
      const category = await categoryService.findById(args.id);
      if (!category) {
        throw new GraphQLError("Category not found", {
          extensions: { code: "NOT_FOUND" },
        });
      }

      return category;
    },
  },
};
