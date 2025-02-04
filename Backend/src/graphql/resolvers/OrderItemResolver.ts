import { GraphQLError } from "graphql";
import { orderItemService } from "../../services/OrderItemService.js";
import { OrderItemStatus, Resolvers } from "../types/resolvers-types.js";
import { orderService } from "../../services/OrderService.js";
import { productService } from "../../services/productServices.js";

export const OrderItemReolver: Resolvers = {
  Mutation: {
    updateOrderItemStatus: async (parent, { orderItemId, status }, context) => {
      if (!context.currentUser) {
        throw new GraphQLError("Not Authorized", {
          extensions: { code: "UNAUTHORIZED" },
        });
      }
      const orderItem = await orderItemService.findOneById(orderItemId);
      if (orderItem === null) {
        throw new GraphQLError("Order Item Not Found", {
          extensions: { code: "INVALID_INPUTS" },
        });
      }
      if (
        orderItem.product.owner.id !== context.currentUser.userId &&
        orderItem.order.buyer.id !== context.currentUser.userId
      ) {
        throw new GraphQLError("Not Authorized", {
          extensions: { code: "UNAUTHORIZED" },
        });
      }
      if (
        orderItem.status === OrderItemStatus.Cancelled ||
        orderItem.status === OrderItemStatus.Failed
      ) {
        throw new GraphQLError("Can Not Update The Status", {
          extensions: { code: "INVALID_INPUTS" },
        });
      }
      if (status === OrderItemStatus.Cancelled) {
        if (orderItem.order.buyer.id !== context.currentUser.userId) {
          throw new GraphQLError("Not Authorized", {
            extensions: { code: "UNAUTHORIZED" },
          });
        }
        if (orderItem.status != OrderItemStatus.Pending) {
          throw new GraphQLError("Can Not Update The Status", {
            extensions: { code: "INVALID_INPUTS" },
          });
        }
      } else {
        const sellerAllowedStatus = [
          OrderItemStatus.Pending,
          OrderItemStatus.Failed,
          OrderItemStatus.Confirmed,
          OrderItemStatus.Shipped,
          OrderItemStatus.Delivered,
          OrderItemStatus.Refunded,
        ];
        const newIndex = sellerAllowedStatus.findIndex((s) => s === status);
        const oldIndex = sellerAllowedStatus.findIndex(
          (s) => s === orderItem.status
        );
        if (newIndex <= oldIndex) {
          throw new GraphQLError("Can Not Update The Status", {
            extensions: { code: "INVALID_INPUTS" },
          });
        }
      }
      orderItem.status = status;
      await orderItemService.update(orderItem);
      if (
        status === OrderItemStatus.Failed ||
        status === OrderItemStatus.Cancelled
      ) {
        const product = orderItem.product;
        product.quantity += orderItem.quantity;
        await productService.update(product);
      }
      return orderItem;
    },
  },
  Query: {
    getOrderItem: async (parent, { OrderItemId }, context) => {
      if (!context.currentUser) {
        throw new GraphQLError("Not Authorized", {
          extensions: { code: "UNAUTHORIZED" },
        });
      }

      const orderItem = await orderItemService.findOneById(OrderItemId);
      if (orderItem === null) {
        throw new GraphQLError("Order Item Not Found", {
          extensions: { code: "INVALID_INPUTS" },
        });
      }
      return orderItem;
    },
    getOrderItemsForSeller: async (parent, {}, context) => {
      if (!context.currentUser) {
        throw new GraphQLError("Not Authorized", {
          extensions: { code: "UNAUTHORIZED" },
        });
      }
      return await orderItemService.findBySellerId(context.currentUser.userId);
    },
    getOrderItemsByOrderId: async (parent, { orderId }, context) => {
      if (!context.currentUser) {
        throw new GraphQLError("Not Authorized", {
          extensions: { code: "UNAUTHORIZED" },
        });
      }
      const order = await orderService.findOneById(orderId);
      if (order === null) {
        throw new GraphQLError("Order Not Found", {
          extensions: { code: "INVALID_INPUTS" },
        });
      }
      if (order.buyer.id !== context.currentUser.userId) {
        throw new GraphQLError("Not Authorized", {
          extensions: { code: "UNAUTHORIZED" },
        });
      }
      return order.orderItems;
    },
  },
};
