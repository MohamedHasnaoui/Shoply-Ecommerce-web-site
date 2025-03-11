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
    category: Category!
    createdAt: DateTime!
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
  type productPageAndCountOfAll {
    products: [Product!]!
    count: Int!
  }
  type ProductsStatistics {
    countAvailable: Int!
    countOutOfStock: Int!
  }
  type Query {
    getAllProducts(
      available: Boolean
      categoryId: Int
      pageNb: Int
      pageSize: Int
    ): productPageAndCountOfAll!
    getAllMyProducts(
      available: Boolean
      categoryId: Int
      pageNb: Int
      pageSize: Int
    ): productPageAndCountOfAll!

    getProduct(id: Int!): Product!

    getMyProductsStatistics: ProductsStatistics!
  }
  type Mutation {
    createProduct(input: CreateProductInput!): Product!
    updateProduct(input: UpdateProductInput!): Product!
    removeProduct(productId: Int!): Boolean!
    incrementQuantity(productId: Int!, addedQte: Int!): Product!
  }
`;
