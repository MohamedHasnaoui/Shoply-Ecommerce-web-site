import gql from "graphql-tag";

export const buyerSchema = gql`
  type Query {
    getCustomerPastOrderItems(customerId: Int!): [OrderItem!]
  }
`;
