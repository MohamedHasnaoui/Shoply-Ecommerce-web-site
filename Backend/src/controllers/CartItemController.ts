import { GraphQLError } from "graphql";
import { MyContext } from "../graphql"; // Make sure this path is correct
import {
  MutationCreatCartItemArgs,
  MutationUpdateCartItemArgs,
  MutationRemoveCartItemArgs,
  Role,
} from "../graphql/types/resolvers-types.js";
import { ErrorCode } from "../../utils/Errors.js";
import { userService } from "../services/userService.js";
import { cartItemService } from "../services/CartItemServices.js";
import { shoppingCartService } from "../services/ShoppingCartService.js";
import { Buyer, User } from "../entities"; // Assuming Buyer extends User or has a user property

export class CartItemController {
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
      throw new GraphQLError("Authenticated user not found", {
        extensions: { code: ErrorCode.NOT_FOUND },
      });
    }

    if (user.role !== Role.Buyer) {
      throw new GraphQLError("You should be a buyer", {
        extensions: { code: ErrorCode.NOT_AUTHORIZED },
      });
    }

    return user;
  }

  // --- MUTATIONS ---

  async creatCartItem(parent: {}, args: MutationCreatCartItemArgs, context: MyContext) {
    const user = await this._ensureBuyer(context); // Auth check is now one line!

    const shoppingCart = await shoppingCartService.getShoppingCartByBuyerId(user.id);

    if (!shoppingCart) {
      throw new GraphQLError("Shopping Cart Not Found", {
        extensions: { code: ErrorCode.CART_NOT_FOUND },
      });
    }

    const cartItem = await cartItemService.create(
      shoppingCart.id,
      args.input.idProduct,
      args.input.quantity
    );

    if (!cartItem) {
      // It's good practice to log server-side errors
      console.error("Failed to create Cart Item for cart ID:", shoppingCart.id);
      throw new GraphQLError("Server Error: Could not create cart item", {
        extensions: { code: ErrorCode.INTERNAL_SERVER_ERROR },
      });
    }

    return cartItem;
  }

  async updateCartItem(parent: {}, args: MutationUpdateCartItemArgs, context: MyContext) {
    await this._ensureBuyer(context);
    return await cartItemService.update(args.input);
  }

  async removeCartItem(parent: {}, args: MutationRemoveCartItemArgs, context: MyContext) {
    await this._ensureBuyer(context);
    const deleteResult = await cartItemService.delete(args.idCartItem);
    // This check is a robust way to confirm a deletion
    return deleteResult.affected !== null && deleteResult.affected > 0;
  }
}

// Export a singleton instance of the controller
export const cartItemController = new CartItemController();