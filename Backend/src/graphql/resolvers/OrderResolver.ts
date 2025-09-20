import { Resolvers } from "../types/resolvers-types.js";
import { orderController } from "../../controllers/OrderController.js"; // Import the new controller

export const OrderResolver: Resolvers = {
  Mutation: {
    createOrder: orderController.createOrder.bind(orderController),
  },
  Query: {
    getMyOrders: orderController.getMyOrders.bind(orderController),
    getOrder: orderController.getOrder.bind(orderController),
  },
};