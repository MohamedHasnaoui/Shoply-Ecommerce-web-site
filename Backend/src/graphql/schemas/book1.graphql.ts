import { gql } from "graphql-tag";
export const book1_schema = gql`
  #graphql
  type Query {
    books1: [Book1]
  }

  type Book1 {
    title: String
    author: String
  }

  type AddBookMutationResponse1 {
    code: String!
    success: Boolean!
    message: String!
    book: Book1
  }

  type Mutation {
    addBook1(title: String, author: String): AddBookMutationResponse1
  }
`;
