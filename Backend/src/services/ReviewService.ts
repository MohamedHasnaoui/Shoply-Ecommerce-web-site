import { Repository } from "typeorm";
import { Review } from "../entities/index.js";
import {
  CreateReviewInput,
  OrderItemStatus,
} from "../graphql/types/resolvers-types.js";
import { orderItemService } from "./OrderItemService.js";
import { GraphQLError } from "graphql";
import { validateOrReject } from "class-validator";
import { appDataSource } from "../database/data-source.js";
import { productService } from "./productServices.js";

export class ReviewService {
  constructor(private reviewRepository: Repository<Review>) {}

  async create(createReviewInput: CreateReviewInput, buyerId: number) {
    const orderItem = await orderItemService.findByBuyerIdAndProductId(
      buyerId,
      createReviewInput.productId
    );
    if (orderItem === null) {
      throw new GraphQLError("You can not Review this product", {
        extensions: { Code: "UNHOTORIZED" },
      });
    }
    if (orderItem.status !== OrderItemStatus.Delivered) {
      throw new GraphQLError("Product Not Delivered", {
        extensions: { Code: "BAD_USER_INPUTS" },
      });
    }
    const oldReview = await this.findOneByProductIdAndBuyerId(
      createReviewInput.productId,
      buyerId
    );
    if (oldReview) {
      throw new GraphQLError("Review Already Exists", {
        extensions: { Code: "BAD_USER_INPUTS" },
      });
    }
    const product = await productService.findById(createReviewInput.productId);
    if (!product) {
      throw new GraphQLError("Product not found", {
        extensions: { Code: "BAD_USER_INPUTS" },
      });
    }
    const nbReviews = await this.countByProductId(product.id);
    product.rating += createReviewInput.rating / (nbReviews + 1);
    product.rating = parseFloat(product.rating.toFixed(1));
    const review = this.reviewRepository.create({
      rating: createReviewInput.rating,
      comment: createReviewInput.comment,
      product: product,
      reviewer: { id: buyerId },
    });
    try {
      validateOrReject(review);
      await this.reviewRepository.save(review);
      await productService.update(product);
      return review;
    } catch (errors) {
      throw new GraphQLError("validation error", {
        extensions: { errors, code: "BAD USER INPUTS" },
      });
    }
  }
  async update(review: Review) {
    const originalReview = await this.findOneById(review.id);
    const product = await productService.findById(review.product.id);
    const nbRating = await this.countByProductId(product.id);
    try {
      validateOrReject(review);
      product.rating += (review.rating - originalReview.rating) / nbRating;
      product.rating = parseFloat(product.rating.toFixed(1));
      await this.reviewRepository.save(review);
      await productService.update(product);
      review.product = product;
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
      relations: { reviewer: true, product: true },
    });
  }
  async findByProductId(productId: number) {
    return await this.reviewRepository.find({
      where: { product: { id: productId } },
      relations: { reviewer: true },
    });
  }
  async countByProductId(productId: number) {
    return await this.reviewRepository.count({
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
  async delete(review: Review) {
    const product = await productService.findById(review.product.id);
    const nbRating = await this.countByProductId(product.id);
    product.rating -= review.rating / nbRating;
    product.rating = parseFloat(product.rating.toFixed(1));
    await this.reviewRepository.delete(review);
    await productService.update(product);
    return true;
  }
}
export const reviewService = new ReviewService(
  appDataSource.getRepository(Review)
);
