import { Resolvers } from "../types/resolvers-types.js";
import { orderItemController } from "../../controllers/OrderItemController.js"; // Import the new controller

export const OrderItemReolver: Resolvers = {
  Mutation: {
    updateOrderItemStatus: orderItemController.updateOrderItemStatus.bind(orderItemController),
  },
  Query: {
    getOrderItem: orderItemController.getOrderItem.bind(orderItemController),
    getOrderItemsForSeller: orderItemController.getOrderItemsForSeller.bind(orderItemController),
    getOrderItemsByOrderId: orderItemController.getOrderItemsByOrderId.bind(orderItemController),
    getRecievedOrderItemsStatistics: orderItemController.getRecievedOrderItemsStatistics.bind(orderItemController),
    getEarningByPeriod: orderItemController.getEarningByPeriod.bind(orderItemController),
    getOrdersByPeriod: orderItemController.getOrdersByPeriod.bind(orderItemController),
  },
};