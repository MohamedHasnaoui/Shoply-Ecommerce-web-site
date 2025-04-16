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
    product: Product
    quantity: Int!
    price: Float!
    status: OrderItemStatus!
    createdAt: DateTime!
    updatedAt: DateTime!
  }
  enum PeriodFilter {
    DAY
    WEEK
    MONTH
    YEAR
  }
  input OrderItemFilter {
    period: PeriodFilter
    status: OrderItemStatus
    pageNb: Int
    pageSize: Int
  }
  type OrderItemsListResult {
    orderItems: [OrderItem!]!
    count: Int!
  }
  type OrderItemStatistics {
    countPending: Int
    countCanceledOrFailed: Int
    countDelivered: Int
    all: Int
    totalEarnings: Float
    totalNewCustomers: Int
  }
  type Query {
    getOrderItem(OrderItemId: Int!): OrderItem!
    getOrderItemsByOrderId(orderId: Int): [OrderItem]!
    getOrderItemsForSeller(input: OrderItemFilter!): OrderItemsListResult!
    getRecievedOrderItemsStatistics(period: PeriodFilter): OrderItemStatistics!
    getEarningByPeriod(period: PeriodFilter): [Float!]!
    getOrdersByPeriod(period: PeriodFilter): [Float!]!
  }
  type Mutation {
    updateOrderItemStatus(
      orderItemId: Int!
      status: OrderItemStatus!
    ): OrderItem!
  }
`;
