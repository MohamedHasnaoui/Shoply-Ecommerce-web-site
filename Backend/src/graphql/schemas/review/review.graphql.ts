import gql from "graphql-tag";

export const reviewSchema = gql`
  #graphql
  type Review {
    id: Int
    rating: Int
    comment: String
    createdAt: DateTime
    updatedAt: DateTime
    reviewer: User
    product: Product
  }
  input CreateReviewInput {
    rating: Int!
    comment: String!
    productId: Int!
  }
  input UpdateReviewInput {
    id: Int!
    rating: Int!
    comment: String!
  }
  type Query {
    getReviewsByProductId(productId: Int!): [Review]
    getMyProductReview(productId: Int!): Review
    isBuyerAllowedToReview(productId: Int!): Boolean!
  }
  type Mutation {
    createReview(input: CreateReviewInput!): Review!
    updateReview(input: UpdateReviewInput!): Review!
    deleteReview(reviewId: Int!): Boolean
  }
`;
