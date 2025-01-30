import { gql } from "graphql-tag";

export const orderItemSchema = gql`
  #graphql
  enum OrderItemStatus {
    PENDING
    CONFIRMED
    SHIPPED
    DELIVERED
    RETURNED
    REFUNDED
    FAILED
    CANCELLED
  }
  type OrderItem {
    id: Int!
    product: Product!
    quantity: Int!
    price: Float!
    status: OrderItemStatus!
    createdAt: DateTime!
    updatedAt: DateTime!
  }
  type Query {
    getOrderItem(id: Int!): OrderItem!
    getOrderItemsByOrderId(orderId: Int): [OrderItem]!
    getOrderItemsByBuyerId(buyerId: Int): [OrderItem]!
  }
  type Mutation {
    updateOrderItemStatus(
      orderItemId: Int!
      status: OrderItemStatus!
    ): OrderItem!
  }
`;
