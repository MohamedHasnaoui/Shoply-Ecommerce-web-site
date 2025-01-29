import { GraphQLError } from "graphql";
import { categoryService } from "../../services/categoryServices.js";
import { Resolvers } from "../types/resolvers-types";

export const CategoryResolver: Resolvers = {
  Mutation: {
    createCategory: async (parent, { input }, context) => {
      try {
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
