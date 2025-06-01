import { GraphQLError } from "graphql";
import { orderItemService } from "../../services/OrderItemService.js";
import { OrderItemStatus, Resolvers, Role } from "../types/resolvers-types.js";
import { orderService } from "../../services/OrderService.js";
import { userService } from "../../services/userService.js";
import { NextStatusBuyer, NextStatusSeller } from "../../entities/index.js";
import { ErrorCode } from "../../../utils/Errors.js";

export const OrderItemReolver: Resolvers = {
  Mutation: {
    updateOrderItemStatus: async (parent, { orderItemId, status }, context) => {
      if (!context.currentUser) {
        throw new GraphQLError("Not Authenticated", {
          extensions: { code: ErrorCode.UNAUTHENTICATED },
        });
      }
      const orderItem = await orderItemService.findOneById(orderItemId);
      if (orderItem === null) {
        throw new GraphQLError("Order Item Not Found", {
          extensions: { code: ErrorCode.BAD_USER_INPUT },
        });
      }
      const user = await userService.findOneById(context.currentUser.userId);
      if (user.role == Role.Buyer) {
        return await orderItemService.updateStatus(
          orderItem,
          status,
          NextStatusBuyer
        );
      } else if (user.role == Role.Seller) {
        return await orderItemService.updateStatus(
          orderItem,
          status,
          NextStatusSeller
        );
      }
      return orderItem;
    },
  },
  Query: {
    getOrderItem: async (parent, { OrderItemId }, context) => {
      if (!context.currentUser) {
        throw new GraphQLError("UNAUTHENTICATED", {
          extensions: { code: ErrorCode.UNAUTHENTICATED },
        });
      }

      const orderItem = await orderItemService.findOneById(OrderItemId);
      if (orderItem === null) {
        throw new GraphQLError("Order Item Not Found", {
          extensions: { code: ErrorCode.BAD_USER_INPUT },
        });
      }
      return orderItem;
    },
    getOrderItemsForSeller: async (parent, { input }, context) => {
      if (!context.currentUser) {
        throw new GraphQLError("UNAUTHENTICATED", {
          extensions: { code: ErrorCode.UNAUTHENTICATED },
        });
      }
      return await orderItemService.findBySellerId(
        context.currentUser.userId,
        input
      );
    },
    getOrderItemsByOrderId: async (parent, { orderId }, context) => {
      if (!context.currentUser) {
        throw new GraphQLError("UNAUTHENTICATED", {
          extensions: { code: ErrorCode.UNAUTHENTICATED },
        });
      }
      const order = await orderService.findOneById(orderId);
      if (order === null) {
        throw new GraphQLError("Order Not Found", {
          extensions: { code: ErrorCode.BAD_USER_INPUT },
        });
      }
      if (order.buyer.id !== context.currentUser.userId) {
        throw new GraphQLError("UNAUTHORIZED", {
          extensions: { code: ErrorCode.NOT_AUTHORIZED },
        });
      }
      return order.orderItems;
    },
    getRecievedOrderItemsStatistics: async (parent, { period }, context) => {
      if (!context.currentUser) {
        throw new GraphQLError("Not Authorized", {
          extensions: { code: "UNAUTHORIZED" },
        });
      }
      const countDelivered = await orderItemService.countBySellerAndStatus(
        context.currentUser.userId,
        [OrderItemStatus.Delivered],
        period
      );
      const countCanceledOrFailed =
        await orderItemService.countBySellerAndStatus(
          context.currentUser.userId,
          [OrderItemStatus.Cancelled, OrderItemStatus.Failed],
          period
        );
      const countPending = await orderItemService.countBySellerAndStatus(
        context.currentUser.userId,
        [OrderItemStatus.Pending],
        period
      );
      const all = await orderItemService.countAllBySeller(
        context.currentUser.userId,
        period
      );
      const { totalEarnings } = await orderItemService.totalEarning(
        context.currentUser.userId,
        period
      );
      const { totalNewCustomers } = await orderItemService.totalNewCustomers(
        context.currentUser.userId,
        period
      );
      return {
        countDelivered,
        countCanceledOrFailed,
        countPending,
        all,
        totalEarnings,
        totalNewCustomers,
      };
    },
    getEarningByPeriod: async (parent, { period }, context) => {
      if (!context.currentUser) {
        throw new GraphQLError("UNAUTHENTICATED", {
          extensions: { code: ErrorCode.UNAUTHENTICATED },
        });
      }
      const totalEarnings = await orderItemService.getPeriodEarningList(
        context.currentUser.userId,
        period
      );
      return totalEarnings;
    },
    getOrdersByPeriod: async (parent, { period }, context) => {
      if (!context.currentUser) {
        throw new GraphQLError("UNAUTHENTICATED", {
          extensions: { code: ErrorCode.UNAUTHENTICATED },
        });
      }
      const totalOrders = await orderItemService.getOrderCountPeriodList(
        context.currentUser.userId,
        period
      );
      return totalOrders;
    },
  },
};
