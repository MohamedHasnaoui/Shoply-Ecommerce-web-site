import { gql } from "graphql-tag";

export const orderSchema = gql`
  #graphql
  enum Status {
    Pending
    Confirmed
    Failed
    Cancelled
    Shipped
    Partially
    Shipped
    Delivered
    Partially
    Delivered
    Returned
    Refunded
  }
`;
