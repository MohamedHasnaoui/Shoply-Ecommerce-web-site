import { gql } from "graphql-tag";

export const categorySchema = gql`
  #graphql
  type Category {
    id: Int!
    name: String!
    description: String!
  }

  input CategoryUpdatedInput {
    id: Int!
    name: String
    description: String
  }

  input CategoryInput {
    name: String!
    description: String!
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
