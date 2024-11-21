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
`;
