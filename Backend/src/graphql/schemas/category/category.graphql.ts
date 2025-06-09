import { gql } from "graphql-tag";

export const categorySchema = gql`
  #graphql
  type Category {
    id: Int
    name: String
    description: String
    image: String
    productCount: Int
  }

  input CategoryUpdatedInput {
    id: Int!
    name: String
    description: String
    image: String
  }

  input CategoryInput {
    name: String!
    description: String!
    image: String
  }

  type Query {
    getAllCategories: [Category]
    getCategory(id: Int!): Category
  }
  type Mutation {
    createCategory(input: CategoryInput!): Category!
    updateCategory(input: CategoryUpdatedInput): Category!
  }
`;
