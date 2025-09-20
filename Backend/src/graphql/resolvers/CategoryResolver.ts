import { Resolvers } from "../types/resolvers-types.js";
import { categoryController } from "../../controllers/CategoryController.js"; // Import the controller
import { productService } from "../../services/productServices.js"; // Import for field resolver

export const CategoryResolver: Resolvers = {
  // Field resolver for the 'Category' type
  Category: {
    // This resolver is called whenever a 'Category' object is returned in a query.
    // 'parent' here is the category object itself (e.g., { id: 1, name: 'Electronics' })
    productCount: async (parent) => {
      // Delegate the counting logic to the service layer
      return await productService.countProductsByCategoryId(parent.id);
    },
  },

  Query: {
    getAllCategories: categoryController.getAllCategories.bind(categoryController),
    getCategory: categoryController.getCategory.bind(categoryController),
  },

  Mutation: {
    createCategory: categoryController.createCategory.bind(categoryController),
    updateCategory: categoryController.updateCategory.bind(categoryController),
  },
};