import { GraphQLError } from "graphql";
import { MyContext } from "../graphql"; // Make sure this path is correct
import {
  QueryGetFilteredWishListArgs,
  MutationAddProductToWishListArgs,
  MutationDeleteProductFromWishListArgs,
  Role,
} from "../graphql/types/resolvers-types.js";
import { ErrorCode } from "../../utils/Errors.js"; // Make sure this path is correct
import { userService } from "../services/userService.js";
import { whishListService } from "../services/WhishListService.js";
import { User } from "../entities"; // Make sure this path is correct

export class WhishListController {
  /**
   * Private helper to ensure the current user is a logged-in Buyer.
   * This single method replaces all the repeated auth code.
   * Returns the authenticated user object on success.
   */
  private async _ensureBuyer(context: MyContext): Promise<User> {
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

    if (user.role !== Role.Buyer) {
      throw new GraphQLError("You should be a buyer to manage a wish list", {
        extensions: { code: ErrorCode.NOT_AUTHORIZED },
      });
    }

    return user;
  }

  // --- QUERIES ---

  async getWishList(parent: {}, args: {}, context: MyContext) {
    const user = await this._ensureBuyer(context);
    const wishList = await whishListService.getWishListByBuyerId(user.id);

    if (!wishList) {
      console.error(`Wishlist not found for buyer ID: ${user.id}`);
      // This could indicate a data consistency issue, e.g., a buyer exists without a wishlist.
      throw new GraphQLError("Wishlist could not be found.", {
        extensions: { code: ErrorCode.NOT_FOUND }, // NOT_FOUND is more accurate than the original
      });
    }

    return wishList;
  }

  async getFilteredWishList(parent: {}, args: QueryGetFilteredWishListArgs, context: MyContext) {
    const user = await this._ensureBuyer(context);
    // The try/catch from the original resolver is good practice for service calls
    try {
      return await whishListService.getFilteredWishlistProducts(user.id, args.input);
    } catch (error) {
      console.error("Error fetching filtered wish list for user:", user.id, error);
      throw new GraphQLError("Server Error retrieving filtered wish list", {
        extensions: { code: ErrorCode.INTERNAL_SERVER_ERROR },
      });
    }
  }

  // --- MUTATIONS ---

  async addProductToWishList(parent: {}, args: MutationAddProductToWishListArgs, context: MyContext) {
    const user = await this._ensureBuyer(context);
    try {
      return await whishListService.addProductToWishList(user.id, args.productId);
    } catch (error) {
      console.error("Error adding product to wish list for user:", user.id, error);
      throw new GraphQLError("Server Error adding product to wish list", {
        extensions: { code: ErrorCode.INTERNAL_SERVER_ERROR },
      });
    }
  }

  async deleteProductFromWishList(parent: {}, args: MutationDeleteProductFromWishListArgs, context: MyContext) {
    const user = await this._ensureBuyer(context);
    try {
      return await whishListService.deleteProductFromWishList(user.id, args.productId);
    } catch (error) {
      console.error("Error deleting product from wish list for user:", user.id, error);
      throw new GraphQLError("Server Error deleting product from wish list", {
        extensions: { code: ErrorCode.INTERNAL_SERVER_ERROR },
      });
    }
  }
}

// Export a singleton instance of the controller
export const whishListController = new WhishListController();