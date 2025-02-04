import { GraphQLError } from "graphql";
import { userService } from "../../services/UserService.js";
import { Resolvers, Role } from "../types/resolvers-types.js";
import { reviewService } from "../../services/ReviewService.js";

export const ReviewResolver: Resolvers = {
  Mutation: {
    createReview: async (parent, { input }, context) => {
      if (!context.currentUser) {
        throw new GraphQLError("Not Authorized", {
          extensions: { code: "UNAUTHORIZED" },
        });
      }
      const user = await userService.findOneById(context.currentUser.userId);
      if (user.role != Role.Buyer) {
        throw new GraphQLError("Not Authorized", {
          extensions: { code: "UNAUTHORIZED" },
        });
      }
      return await reviewService.create(input, user.id);
    },
    updateReview: async (parent, { input }, context) => {
      if (!context.currentUser) {
        throw new GraphQLError("Not Authorized", {
          extensions: { code: "UNAUTHORIZED" },
        });
      }
      const review = await reviewService.findOneById(input.id);
      if (review === null) {
        throw new GraphQLError("Review Not Found", {
          extensions: { code: "INVALID_INPUTS" },
        });
      }
      if (review.reviewer.id !== context.currentUser.userId) {
        throw new GraphQLError("Not Authorized", {
          extensions: { code: "UNAUTHORIZED" },
        });
      }
      review.comment = input.comment || review.comment;
      review.rating = input.rating || review.rating;
      review.updatedAt = new Date();
      return await reviewService.update(review);
    },
    deleteReview: async (parent, { reviewId }, context) => {
      if (!context.currentUser) {
        throw new GraphQLError("Not Authorized", {
          extensions: { code: "UNAUTHORIZED" },
        });
      }
      const review = await reviewService.findOneById(reviewId);
      if (review === null) {
        throw new GraphQLError("Review Not Found", {
          extensions: { code: "INVALID_INPUTS" },
        });
      }
      if (review.reviewer.id !== context.currentUser.userId) {
        throw new GraphQLError("Not Authorized", {
          extensions: { code: "UNAUTHORIZED" },
        });
      }
      return await reviewService.delete(review);
    },
  },
  Query: {
    getReviewsByProductId: async (parent, { productId }, context) => {
      return reviewService.findByProductId(productId);
    },
  },
};
