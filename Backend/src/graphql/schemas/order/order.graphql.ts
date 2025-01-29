import { gql } from "graphql-tag";

export const orderSchema = gql`
  #graphql
  enum OrderStatus {
    PENDING
    CONFIRMED
    FAILED
    CANCELLED
    SHIPPED
    PARTIALLYSHIPPED
    DELIVERED
    PARTIALLYDELIVERED
    RETURNED
    REFUNDED
  }

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

  enum PaymentType {
    VISA
    PAYPAL
  }
  type OrderItem {
    id: Int!
    product: Product!
    quantity: Int!
    price: Float!
    status: OrderItemStatus!
    createdAt: String!
    updatedAt: String!
  }
  type Order {
    id: Int!
    status: OrderStatus!
    totalAmount: Float!
    orderItems: [OrderItem]!
    buyer: User!
    createdAt: String!
    updatedAt: String!
  }
`;
