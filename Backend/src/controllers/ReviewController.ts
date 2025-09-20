import { GraphQLError } from "graphql";
import { MyContext } from "../graphql"; // Make sure this path is correct
import {
  MutationCreateReviewArgs,
  MutationUpdateReviewArgs,
  MutationDeleteReviewArgs,
  QueryGetReviewsByProductIdArgs,
  QueryGetMyProductReviewArgs,
  QueryIsBuyerAllowedToReviewArgs,
  Role,
} from "../graphql/types/resolvers-types.js";
import { ErrorCode } from "../../utils/Errors.js";
import { userService } from "../services/userService.js";
import { reviewService } from "../services/ReviewService.js";
import { User, Review } from "../entities";

export class ReviewController {
  /**
   * Helper 1: Ensures user is authenticated and returns the User object.
   */
  private async _ensureAuthenticated(context: MyContext): Promise<User> {
    if (!context.currentUser?.userId) {
      throw new GraphQLError("Not Authenticated", { extensions: { code: ErrorCode.UNAUTHENTICATED } });
    }
    const user = await userService.findOneById(context.currentUser.userId);
    if (!user) {
      throw new GraphQLError("Authenticated user not found", { extensions: { code: ErrorCode.NOT_FOUND } });
    }
    return user;
  }

  /**
   * Helper 2: Ensures the user is an authenticated Buyer.
   */
  private async _ensureBuyer(context: MyContext): Promise<User> {
    const user = await this._ensureAuthenticated(context);
    if (user.role !== Role.Buyer) {
      throw new GraphQLError("Only buyers can perform this action", { extensions: { code: ErrorCode.NOT_AUTHORIZED } });
    }
    return user;
  }

  /**
   * Helper 3: Ensures the user owns the review they are trying to modify.
   * Returns the review object on success to avoid a second DB call.
   */
  private async _ensureReviewOwner(reviewId: number, context: MyContext): Promise<Review> {
    const user = await this._ensureAuthenticated(context);
    const review = await reviewService.findOneById(reviewId);
    if (!review) {
      throw new GraphQLError("Review Not Found", { extensions: { code: ErrorCode.NOT_FOUND } });
    }
    if (review.reviewer.id !== user.id) {
      throw new GraphQLError("You are not authorized to modify this review", { extensions: { code: ErrorCode.NOT_AUTHORIZED } });
    }
    return review;
  }

  // --- MUTATIONS ---

  async createReview(parent: {}, args: MutationCreateReviewArgs, context: MyContext) {
    const user = await this._ensureBuyer(context);
    return await reviewService.create(args.input, user.id);
  }

  async updateReview(parent: {}, args: MutationUpdateReviewArgs, context: MyContext) {
    const review = await this._ensureReviewOwner(args.input.id, context);
    
    review.comment = args.input.comment ?? review.comment;
    review.rating = args.input.rating ?? review.rating;
    review.updatedAt = new Date(); // Explicitly set update time
    
    return await reviewService.update(review);
  }

  async deleteReview(parent: {}, args: MutationDeleteReviewArgs, context: MyContext) {
    const review = await this._ensureReviewOwner(args.reviewId, context);
    return await reviewService.delete(review);
  }

  // --- QUERIES ---

  async getReviewsByProductId(parent: {}, args: QueryGetReviewsByProductIdArgs, context: MyContext) {
    // This is a public query, no auth needed.
    return await reviewService.findByProductId(args.productId);
  }

  async getMyProductReview(parent: {}, args: QueryGetMyProductReviewArgs, context: MyContext) {
    const user = await this._ensureAuthenticated(context);
    return await reviewService.findOneByProductIdAndBuyerId(args.productId, user.id);
  }

  async isBuyerAllowedToReview(parent: {}, args: QueryIsBuyerAllowedToReviewArgs, context: MyContext) {
    const user = await this._ensureAuthenticated(context);
    return await reviewService.canMakeReview(user.id, args.productId);
  }
}

// Export a singleton instance
export const reviewController = new ReviewController();