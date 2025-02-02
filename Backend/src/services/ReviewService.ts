import { Repository } from "typeorm";
import { Review } from "../entities";
import {
  CreateReviewInput,
  OrderItemStatus,
} from "../graphql/types/resolvers-types";
import { orderItemService } from "./OrderItemService";
import { GraphQLError } from "graphql";
import { validateOrReject } from "class-validator";
import { appDataSource } from "../database/data-source";

export class ReviewService {
  constructor(private reviewRepository: Repository<Review>) {}

  async create(createReviewInput: CreateReviewInput, buyerId: number) {
    const orderItem = await orderItemService.findByBuyerIdAndProductId(
      buyerId,
      createReviewInput.productId
    );
    if (orderItem === null) {
      throw new GraphQLError("UNHOTORIZED", {
        extensions: { Code: "UNHOTORIZED" },
      });
    }
    if (orderItem.status !== OrderItemStatus.Delivered) {
      throw new GraphQLError("Product Not Delivered", {
        extensions: { Code: "BAD_USER_INPUTS" },
      });
    }
    const oldReview = this.findOneByProductIdAndBuyerId(
      createReviewInput.productId,
      buyerId
    );
    if (oldReview) {
      throw new GraphQLError("Review Already Exists", {
        extensions: { Code: "BAD_USER_INPUTS" },
      });
    }
    const review = this.reviewRepository.create({
      rating: createReviewInput.rating,
      comment: createReviewInput.comment,
      product: { id: createReviewInput.productId },
      reviewer: { id: buyerId },
    });
    try {
      validateOrReject(review);
      return this.reviewRepository.save(review);
    } catch (errors) {
      throw new GraphQLError("validation error", {
        extensions: { errors, code: "BAD USER INPUTS" },
      });
    }
  }
  async update(review: Review) {
    try {
      validateOrReject(review);
      await this.reviewRepository.update({ id: review.id }, review);
      return review;
    } catch (errors) {
      throw new GraphQLError("validation error", {
        extensions: { errors, code: "BAD USER INPUTS" },
      });
    }
  }
  async findOneById(id: number) {
    return await this.reviewRepository.findOne({
      where: { id },
      relations: { reviewer: true },
    });
  }
  async findByProductId(productId: number) {
    return await this.reviewRepository.find({
      where: { product: { id: productId } },
      relations: { reviewer: true },
    });
  }
  async findOneByProductIdAndBuyerId(productId: number, buyerId: number) {
    return await this.reviewRepository.findOneBy({
      product: { id: productId },
      reviewer: { id: buyerId },
    });
  }
}
export const reviewService = new ReviewService(
  appDataSource.getRepository(Review)
);
