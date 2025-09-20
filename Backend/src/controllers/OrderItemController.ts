import { GraphQLError } from "graphql";
import { MyContext } from "../graphql"; // Make sure this path is correct
import {
  MutationUpdateOrderItemStatusArgs,
  QueryGetOrderItemArgs,
  QueryGetOrderItemsForSellerArgs,
  QueryGetOrderItemsByOrderIdArgs,
  QueryGetRecievedOrderItemsStatisticsArgs,
  QueryGetEarningByPeriodArgs,
  QueryGetOrdersByPeriodArgs,
  Role,
  OrderItemStatus,
} from "../graphql/types/resolvers-types.js";
import { ErrorCode } from "../../utils/Errors.js";
import { userService } from "../services/userService.js";
import { orderItemService } from "../services/OrderItemService.js";
import { orderService } from "../services/OrderService.js";
import { NextStatusBuyer, NextStatusSeller, User } from "../entities/index.js";

export class OrderItemController {
  /**
   * Private helper to ensure user is authenticated.
   * Returns the full user object on success to avoid a second DB call.
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

  // --- MUTATIONS ---

  async updateOrderItemStatus(parent: {}, args: MutationUpdateOrderItemStatusArgs, context: MyContext) {
    const user = await this._ensureAuthenticated(context);
    const orderItem = await orderItemService.findOneById(args.orderItemId);

    if (!orderItem) {
      throw new GraphQLError("Order Item Not Found", {
        extensions: { code: ErrorCode.NOT_FOUND },
      });
    }

    if (user.role === Role.Buyer) {
      return await orderItemService.updateStatus(orderItem, args.status, NextStatusBuyer);
    } else if (user.role === Role.Seller) {
      return await orderItemService.updateStatus(orderItem, args.status, NextStatusSeller);
    }
    
    // If user is neither Buyer nor Seller (e.g., Admin), do nothing or throw error
    // depending on desired business logic. Here we just return the item.
    return orderItem;
  }

  // --- QUERIES ---

  async getOrderItem(parent: {}, args: QueryGetOrderItemArgs, context: MyContext) {
    await this._ensureAuthenticated(context); // We just need the auth check here
    const orderItem = await orderItemService.findOneById(args.OrderItemId);
    if (!orderItem) {
      throw new GraphQLError("Order Item Not Found", {
        extensions: { code: ErrorCode.NOT_FOUND },
      });
    }
    return orderItem;
  }

  async getOrderItemsForSeller(parent: {}, args: QueryGetOrderItemsForSellerArgs, context: MyContext) {
    const user = await this._ensureAuthenticated(context);
    return await orderItemService.findBySellerId(user.id, args.input);
  }

  async getOrderItemsByOrderId(parent: {}, args: QueryGetOrderItemsByOrderIdArgs, context: MyContext) {
    const user = await this._ensureAuthenticated(context);
    const order = await orderService.findOneById(args.orderId);
    if (!order) {
      throw new GraphQLError("Order Not Found", {
        extensions: { code: ErrorCode.NOT_FOUND },
      });
    }
    // Ownership check
    if (order.buyer.id !== user.id) {
      throw new GraphQLError("You are not authorized to view this order's items", {
        extensions: { code: ErrorCode.NOT_AUTHORIZED },
      });
    }
    return order.orderItems;
  }

  async getRecievedOrderItemsStatistics(parent: {}, args: QueryGetRecievedOrderItemsStatisticsArgs, context: MyContext) {
    const user = await this._ensureAuthenticated(context);

    // Use Promise.all to run database queries in parallel for better performance
    const [
      countDelivered,
      countCanceledOrFailed,
      countPending,
      all,
      { totalEarnings },
      { totalNewCustomers },
    ] = await Promise.all([
      orderItemService.countBySellerAndStatus(user.id, [OrderItemStatus.Delivered], args.period),
      orderItemService.countBySellerAndStatus(user.id, [OrderItemStatus.Cancelled, OrderItemStatus.Failed], args.period),
      orderItemService.countBySellerAndStatus(user.id, [OrderItemStatus.Pending], args.period),
      orderItemService.countAllBySeller(user.id, args.period),
      orderItemService.totalEarning(user.id, args.period),
      orderItemService.totalNewCustomers(user.id, args.period),
    ]);

    return { countDelivered, countCanceledOrFailed, countPending, all, totalEarnings, totalNewCustomers };
  }

  async getEarningByPeriod(parent: {}, args: QueryGetEarningByPeriodArgs, context: MyContext) {
    const user = await this._ensureAuthenticated(context);
    return await orderItemService.getPeriodEarningList(user.id, args.period);
  }

  async getOrdersByPeriod(parent: {}, args: QueryGetOrdersByPeriodArgs, context: MyContext) {
    const user = await this._ensureAuthenticated(context);
    return await orderItemService.getOrderCountPeriodList(user.id, args.period);
  }
}

// Export a singleton instance
export const orderItemController = new OrderItemController();