import gql from "graphql-tag";

export const reviewSchema = gql`
  #graphql
  type Review {
    id: Int!
    rating: Int!
    comment: String!
    createdAt: DateTime!
    updatedAt: DateTime!
    reviewer: User!
    product: Product!
  }
  input CreateReviewInput {
    rating: Int!
    comment: String!
    productId: Int!
  }
  input UpdateReviewInput {
    id: Int!
    rating: Int
    comment: String
    productId: Int
  }
  type Query {
    getReviewsByProductId(productId: Int!): [Review]
  }
  type Mutation {
    createReview(input: CreateReviewInput!): Review!
    updateReview(input: UpdateReviewInput!): Review!
  }
`;
