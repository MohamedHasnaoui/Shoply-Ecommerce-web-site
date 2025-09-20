import { Resolvers } from "../types/resolvers-types.js";
import { reviewController } from "../../controllers/ReviewController.js"; // Import the controller

export const ReviewResolver: Resolvers = {
  Mutation: {
    createReview: reviewController.createReview.bind(reviewController),
    updateReview: reviewController.updateReview.bind(reviewController),
    deleteReview: reviewController.deleteReview.bind(reviewController),
  },
  Query: {
    getReviewsByProductId: reviewController.getReviewsByProductId.bind(reviewController),
    getMyProductReview: reviewController.getMyProductReview.bind(reviewController),
    isBuyerAllowedToReview: reviewController.isBuyerAllowedToReview.bind(reviewController),
  },
};