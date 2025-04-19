import { gql } from "graphql-tag";

export const productSchema = gql`
  #graphql

  type Product {
    id: Int!
    name: String
    reference: String
    images: [String!]
    rating: Int
    description: String
    quantity: Int
    price: Float
    category: Category
    createdAt: DateTime
    totalSales: Int
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
  type ProductListResult {
    products: [Product!]!
    count: Int!
  }
  type ProductsStatistics {
    countAvailable: Int!
    countOutOfStock: Int!
  }
  input ProductFilter {
    available: Boolean
    categoryId: Int
    name: String
    pageNb: Int
    pageSize: Int
    rating: String
  }
  type Query {
    getAllProducts(input: ProductFilter): ProductListResult!
    getAllMyProducts(input: ProductFilter): ProductListResult!

    getProduct(id: Int!): Product!

    getMyProductsStatistics: ProductsStatistics!
  }
  type Mutation {
    createProduct(input: CreateProductInput!): Product
    updateProduct(input: UpdateProductInput!): Product
    removeProduct(productId: Int!): Boolean!
    incrementQuantity(productId: Int!, addedQte: Int!): Product
  }
`;
