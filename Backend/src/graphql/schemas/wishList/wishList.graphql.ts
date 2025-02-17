import { gql } from "graphql-tag";

export const wishListSchema = gql`
  #graphql

  type WishList {
    id: Int!
    products: [Product]
  }
  type Query {
    getWishList: WishList!
  }
  type Mutation {
    addProductToWishList(productId: Int!): WishList!
    deleteProductFromWishList(productId: Int!): Boolean!
  }
`;
