import { gql } from "graphql-tag";

export const orderItemSchema = gql`
  #graphql
  enum OrderItemStatus {
    PENDING
    CONFIRMED
    SHIPPED
    DELIVERED
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
    getOrderItem(OrderItemId: Int!): OrderItem!
    getOrderItemsByOrderId(orderId: Int): [OrderItem]!
    getOrderItemsForSeller: [OrderItem]!
  }
  type Mutation {
    updateOrderItemStatus(
      orderItemId: Int!
      status: OrderItemStatus!
    ): OrderItem!
  }
`;
