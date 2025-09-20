import { GraphQLError } from "graphql";
import { MyContext } from "../graphql"; // Make sure this path is correct
import {
  MutationCreateOrderArgs,
  QueryGetMyOrdersArgs,
  QueryGetOrderArgs,
  Role,
} from "../graphql/types/resolvers-types.js";
import { ErrorCode } from "../../utils/Errors.js"; // Make sure this path is correct
import { userService } from "../services/userService.js";
import { orderService } from "../services/OrderService.js";
import { User } from "../entities"; // Make sure this path is correct

export class OrderController {
  /**
   * Private helper to ensure user is authenticated.
   * Returns the full user object on success.
   */
  private async _ensureAuthenticated(context: MyContext): Promise<User> {
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
    return user;
  }

  /**
   * Private helper to ensure the user is an authenticated Buyer.
   */
  private async _ensureBuyer(context: MyContext): Promise<User> {
    const user = await this._ensureAuthenticated(context);
    if (user.role !== Role.Buyer) {
      throw new GraphQLError("Only buyers can perform this action", {
        extensions: { code: ErrorCode.NOT_AUTHORIZED },
      });
    }
    return user;
  }

  // --- MUTATIONS ---

  async createOrder(parent: {}, args: MutationCreateOrderArgs, context: MyContext) {
    // Ensuring only buyers can create orders is a good practice
    const user = await this._ensureBuyer(context);
    return await orderService.create(user.id, args.paymentId);
  }

  // --- QUERIES ---

  async getMyOrders(parent: {}, args: QueryGetMyOrdersArgs, context: MyContext) {
    const user = await this._ensureBuyer(context); // Helper handles both auth and role check
    return await orderService.findByBuyerId(user.id, args.pageNb, args.pageSize);
  }

  async getOrder(parent: {}, args: QueryGetOrderArgs, context: MyContext) {
    const user = await this._ensureAuthenticated(context);
    const order = await orderService.findOneById(args.orderId);

    if (!order) {
      throw new GraphQLError("Order not found", {
        extensions: { code: ErrorCode.NOT_FOUND },
      });
    }

    // **SECURITY FIX**: Ensure the user owns the order they are trying to access.
    // The original resolver let any logged-in user see any order.
    if (order.buyer.id !== user.id) {
      throw new GraphQLError("You are not authorized to view this order", {
        extensions: { code: ErrorCode.NOT_AUTHORIZED },
      });
    }

    return order;
  }
}

// Export a singleton instance of the controller
export const orderController = new OrderController();