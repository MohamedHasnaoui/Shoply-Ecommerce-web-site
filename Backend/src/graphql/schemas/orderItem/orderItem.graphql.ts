import { gql } from "graphql-tag";

export const orderItemSchema = gql`
  #graphql
  enum OrderItemStatus {
    Pending
    Shipped
    Delivered
  }
`;
