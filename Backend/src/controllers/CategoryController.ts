import { GraphQLError } from "graphql";
import { MyContext } from "../graphql"; // Make sure this path is correct
import {
  MutationCreateCategoryArgs,
  MutationUpdateCategoryArgs,
  QueryGetCategoryArgs,
  Role,
} from "../graphql/types/resolvers-types.js";
import { ErrorCode } from "../../utils/Errors.js";
import { userService } from "../services/userService.js";
import { categoryService } from "../services/categoryServices.js";
import { User } from "../entities";

export class CategoryController {
  /**
   * Private helper to ensure the current user is a logged-in Admin.
   */
  private async _ensureAdmin(context: MyContext): Promise<User> {
    if (!context.currentUser?.userId) {
      throw new GraphQLError("You should be logged in", {
        extensions: { code: ErrorCode.UNAUTHENTICATED },
      });
    }
    const user = await userService.findOneById(context.currentUser.userId);
    if (!user) {
      throw new GraphQLError("Authenticated user not found", {
        extensions: { code: ErrorCode.NOT_FOUND },
      });
    }
    if (user.role !== Role.Admin) {
      throw new GraphQLError("Unauthorized Action", {
        extensions: { code: ErrorCode.NOT_AUTHORIZED },
      });
    }
    return user;
  }

  // --- QUERIES ---

  async getAllCategories(parent: {}, args: {}, context: MyContext) {
    return await categoryService.getAllCategories();
  }

  async getCategory(parent: {}, args: QueryGetCategoryArgs, context: MyContext) {
    const category = await categoryService.findById(args.id);
    if (!category) {
      throw new GraphQLError("Category not found", {
        extensions: { code: ErrorCode.NOT_FOUND }, // NOT_FOUND is often more appropriate here
      });
    }
    return category;
  }

  // --- MUTATIONS ---

  async createCategory(parent: {}, args: MutationCreateCategoryArgs, context: MyContext) {
    await this._ensureAdmin(context); // Auth check

    const category = await categoryService.create(args.input);
    if (!category) {
      console.error("Category creation failed for input:", args.input);
      throw new GraphQLError("Server Error: Could not create category", {
        extensions: { code: ErrorCode.INTERNAL_SERVER_ERROR },
      });
    }
    return category;
  }

  async updateCategory(parent: {}, args: MutationUpdateCategoryArgs, context: MyContext) {
    await this._ensureAdmin(context); // Auth check

    const category = await categoryService.findById(args.input.id);
    if (!category) {
      throw new GraphQLError("Category not found with the provided ID", {
        extensions: { code: ErrorCode.NOT_FOUND },
      });
    }

    // Update properties only if they are provided in the input
    category.description = args.input.description ?? category.description;
    category.name = args.input.name ?? category.name;
    category.image = args.input.image ?? category.image;
    
    // The original code had a bug where it would always set description to input.description,
    // potentially nullifying it. The `??` operator (Nullish Coalescing) is safer.

    return await categoryService.update(category);
  }
}

// Export a singleton instance
export const categoryController = new CategoryController();
