import { QueryOptions, MutationOptions } from "@apollo/client";
import {
  CreateReviewInput,
  CreateReviewMutation,
  CreateReviewMutationVariables,
  GetMyProductReviewQuery,
  GetMyProductReviewQueryVariables,
  IsBuyerAllowedToReviewQuery,
  IsBuyerAllowedToReviewQueryVariables,
  UpdateReviewInput,
  UpdateReviewMutation,
  UpdateReviewMutationVariables,
} from "../../generated";
import {
  CREATE_REVIEW,
  GET_MY_PRODUCT_REVIEW,
  IS_BUYER_ALLOWED_TO_REVIEW,
  UPDATE_REVIEW,
} from "../../graphql/review.graphql";
import { client } from "../../graphqlProvider";

class ReviewService {
  async isbuyerAlowedToReview(productId: number) {
    const options: QueryOptions<
      IsBuyerAllowedToReviewQueryVariables,
      IsBuyerAllowedToReviewQuery
    > = {
      variables: { productId },
      query: IS_BUYER_ALLOWED_TO_REVIEW,
    };
    const result = await client.query(options);
    return result;
  }
  async createReview(input: CreateReviewInput) {
    const options: MutationOptions<
      CreateReviewMutation,
      CreateReviewMutationVariables
    > = {
      mutation: CREATE_REVIEW,
      variables: { input },
    };
    const response = await client.mutate(options);
    return response;
  }
  async updateReview(input: UpdateReviewInput) {
    const options: MutationOptions<
      UpdateReviewMutation,
      UpdateReviewMutationVariables
    > = {
      mutation: UPDATE_REVIEW,
      variables: { input },
    };
    const response = await client.mutate(options);
    return response;
  }
  async getMyProductReview(productId: number) {
    const options: QueryOptions<
      GetMyProductReviewQueryVariables,
      GetMyProductReviewQuery
    > = {
      variables: { productId },
      query: GET_MY_PRODUCT_REVIEW,
    };
    const result = await client.query(options);
    return result;
  }
}

export const reviewService = new ReviewService();
