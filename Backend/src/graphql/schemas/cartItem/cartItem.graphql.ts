import { gql } from "graphql-tag";

export const cartItemSchema = gql`
  #graphql

  type CartItem {
    id: Int!
    price: Float!
    quantity: Int!
    product: Product!
  }

  input CartItemInput {
    idProduct: Int!
    quantity: Int!
  }
  input CartItemUpdateInput {
    id: Int!
    quantity: Int!
  }
  type Query {
    getCartItem(idCartItem: Int!): CartItem!
    getAllCartItems: [CartItem]
  }

  type Mutation {
    creatCartItem(input: CartItemInput!): CartItem!
    updateCartItem(input: CartItemUpdateInput!): CartItem!
    removeCartItem(idCartItem: Int!): Boolean!
  }
`;
