import { gql } from "graphql-tag";

export const productSchema = gql`
  #graphql

  type Product {
    id: Int!
    name: String!
    reference: String!
    images: [String!]!
    rating: Int!
    quantity: Int!
    price: Float!
  }

  input ProductInput {
    name: String!
    reference: String!
    images: [String!]!
    rating: Int!
    quantity: Int!
    price: Float!
  }
  type Query {
    getProductsByCategory(categoryId: Int!): [Product]
    getProduct(id: Int!): Product!
  }
  type Mutation {
    createProduct(input: ProductInput!): Product!
  }
`;
