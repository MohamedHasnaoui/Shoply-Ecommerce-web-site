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

  input CreateProductInput {
    name: String!
    reference: String!
    description: String!
    images: [String!]!
    quantity: Int!
    price: Float!
    categoryId: Int!
  }
  input UpdateProductInput {
    id: Int!
    name: String
    reference: String
    description: String
    images: [String]
    rating: Int
    quantity: Int
    price: Float
    categoryId: Int
  }
  type Query {
    getProductsByCategory(
      categoryId: Int!
      pageNb: Int
      pageSize: Int
    ): [Product]
    getAllProducts(pageNb: Int, pageSize: Int): [Product]
    getProduct(id: Int!): Product!
  }
  type Mutation {
    createProduct(input: CreateProductInput!): Product!
    updateProduct(input: UpdateProductInput!): Product!
    removeProduct(productId: Int!): Boolean!
  }
`;
