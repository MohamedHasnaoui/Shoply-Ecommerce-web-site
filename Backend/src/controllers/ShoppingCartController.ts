import { GraphQLError } from "graphql";
import { MyContext } from "../graphql"; // Make sure this path is correct
import { Role } from "../graphql/types/resolvers-types.js";
import { ErrorCode } from "../../utils/Errors.js"; // Make sure this path is correct
import { userService } from "../services/userService.js";
import { shoppingCartService } from "../services/ShoppingCartService.js";
import { User } from "../entities"; // Make sure this path is correct

export class ShoppingCartController {
  /**
   * Private helper to ensure the current user is a logged-in Buyer.
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
      // This case is important for robustness
      throw new GraphQLError("Authenticated user not found", {
        extensions: { code: ErrorCode.NOT_FOUND },
      });
    }

    if (user.role !== Role.Buyer) {
      throw new GraphQLError("You should be a buyer to access the shopping cart", {
        extensions: { code: ErrorCode.NOT_AUTHORIZED },
      });
    }

    return user;
  }

  // --- QUERIES ---

  async getShoppingCart(parent: {}, args: {}, context: MyContext) {
    const user = await this._ensureBuyer(context);
    const shoppingCart = await shoppingCartService.getShoppingCartByBuyerId(user.id);
    
    if (!shoppingCart) {
      console.error(`Shopping cart not found for buyer ID: ${user.id}`);
      // A not-found cart for a valid buyer might indicate a data consistency issue.
      // Returning null or an empty cart structure can be a valid alternative to throwing an error.
      // Here, we'll throw an error to match the original logic.
      throw new GraphQLError("Shopping cart could not be found.", {
        extensions: { code: ErrorCode.INTERNAL_SERVER_ERROR }, // Or NOT_FOUND
      });
    }
    
    return shoppingCart;
  }

  // --- MUTATIONS ---

  async cancelShoppingCart(parent: {}, args: {}, context: MyContext) {
    const user = await this._ensureBuyer(context);
    return await shoppingCartService.cancelShoppingCart(user.id);
  }
}

// Export a singleton instance of the controller
export const shoppingCartController = new ShoppingCartController();