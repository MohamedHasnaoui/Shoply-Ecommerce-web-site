import { gql } from "@apollo/client";

export const IS_BUYER_ALLOWED_TO_REVIEW = gql`
  query IsBuyerAllowedToReview($productId: Int!) {
    isBuyerAllowedToReview(productId: $productId)
  }
`;

export const CREATE_REVIEW = gql`
  mutation CreateReview($input: CreateReviewInput!) {
    createReview(input: $input) {
      id
      rating
      comment
      createdAt
      updatedAt
    }
  }
`;

export const UPDATE_REVIEW = gql`
  mutation UpdateReview($input: UpdateReviewInput!) {
    updateReview(input: $input) {
      id
      rating
      comment
      createdAt
      updatedAt
    }
  }
`;
export const GET_MY_PRODUCT_REVIEW = gql`
  query GetMyProductReview($productId: Int!) {
    getMyProductReview(productId: $productId) {
      id
      rating
      comment
      createdAt
      updatedAt
    }
  }
`;
