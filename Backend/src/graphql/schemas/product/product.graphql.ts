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
  type Category {
    id: Int!
    name: String!
    description: String!
  }

  type Query {
    categories: [Category]
    category(name: String!): Category
    productsByCategory(categoryName: String!): [Product]
    product(productId: Int!): Product!
  }

  input CategoryInput {
    name: String!
    description: String!
  }

  type ResponseMessage {
    content: String!
  }

  input ProductInput {
    name: String!
    reference: String!
    images: [String!]!
    rating: Int!
    quantity: Int!
    price: Float!
  }

  type Mutation {
    addCategory(input: CategoryInput!): Category!
    addProductToCategory(productId: Int!): ResponseMessage!
    addProduct(input: ProductInput!): Product!
  }
`;
