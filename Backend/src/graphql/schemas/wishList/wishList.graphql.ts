import { gql } from "graphql-tag";

export const wishListSchema = gql`
  #graphql
  type WishList {
    id: Int!
    products: [Product]
  }

  input ProductFilterInput {
    name: String
    minPrice: Float
    maxPrice: Float
    minRating: Float
    categoryId: Int
    available: Boolean
  }

  type Query {
    getWishList: WishList!
    getFilteredWishList(input: ProductFilterInput): [Product]
  }

  type Mutation {
    addProductToWishList(productId: Int!): WishList!
    deleteProductFromWishList(productId: Int!): Boolean!
  }
`;
