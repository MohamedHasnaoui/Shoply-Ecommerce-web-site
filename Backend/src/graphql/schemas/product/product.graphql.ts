import { gql } from "graphql-tag";

export const productSchema = gql`
  #graphql
  type Product {
    id: Int!
    name: String!
    price: Float!
    description: String!
    images: [String]!
    rating: Float!
    reference: String
    owner: User!
  }
  input CreateProductInput {
    id: Int!
    name: String!
    price: Float!
    description: String!
    images: [String]!
    reference: String
    ownerId: Int!
  }
`;
