import { gql } from "graphql-tag";

export const shoppingCartSchema = gql`
  type ShoppingCart {
    id: Int!
    totalAmount: Float!
    cartItems: [CartItem]
  }

  type Query {
    getShoppingCart: ShoppingCart
  }
  type Mutation {
    cancelShoppingCart: Boolean!
  }
`;
