import { gql } from "graphql-tag";

export const orderSchema = gql`
  #graphql
  enum rndType {
    ONE
    TWO
  }
  enum OrderStatus {
    PENDING
    CONFIRMED
    FAILED
    CANCELLED
    SHIPPED
    PARTIALLYSHIPPED
    DELIVERED
    PARTIALLYDELIVERED
    REFUNDED
  }

  enum PaymentType {
    VISA
    PAYPAL
  }

  type Order {
    id: Int
    status: OrderStatus
    totalAmount: Float
    orderItems: [OrderItem]
    buyer: User
    createdAt: DateTime
    updatedAt: DateTime
  }
  type Query {
    getMyOrders(pageNb: Int, pageSize: Int): [Order]
    getOrder(orderId: Int!): Order!
  }
  type Mutation {
    createOrder(paymentId: Int!): Order!
  }
`;
