import { GraphQLError } from "graphql";
import { MyContext } from "../graphql"; // Make sure this path is correct
import {
  QueryGetCustomerPastOrderItemsArgs,
  Role,
} from "../graphql/types/resolvers-types.js";
import { ErrorCode } from "../../utils/Errors.js"; // Make sure this path is correct
import { userService } from "../services/userService.js";
import { orderItemService } from "../services/OrderItemService.js";
import { User, Seller } from "../entities"; // Make sure this path is correct

export class SellerController {
  /**
   * Private helper to ensure the current user is a logged-in Seller.
   * Returns the seller object on success.
   */
  private async _ensureSeller(context: MyContext): Promise<Seller> {
    if (!context.currentUser?.userId) {
      throw new GraphQLError("Not Authenticated", {
        extensions: { code: ErrorCode.UNAUTHENTICATED },
      });
    }
    const user = await userService.findOneById(context.currentUser.userId);
    if (!user) {
      throw new GraphQLError("Authenticated user not found", {
        extensions: { code: ErrorCode.NOT_FOUND },
      });
    }
    if (user.role !== Role.Seller) {
      throw new GraphQLError("Only sellers can perform this action", {
        extensions: { code: ErrorCode.NOT_AUTHORIZED },
      });
    }
    return user as Seller;
  }

  // --- QUERIES ---

  async getCustomerPastOrderItems(
    parent: {},
    args: QueryGetCustomerPastOrderItemsArgs,
    context: MyContext
  ) {
    const seller = await this._ensureSeller(context);
    return await orderItemService.findBySellerIdAndCustomerId(
      seller.id,
      args.customerId
    );
  }
}

// Export a singleton instance of the controller
export const sellerController = new SellerController();