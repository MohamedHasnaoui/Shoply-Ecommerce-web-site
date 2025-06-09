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
import { ErrorCode } from "../../utils/Errors.js";

export class ReviewService {
  constructor(private reviewRepository: Repository<Review>) {}

  async canMakeReview(buyerId: number, productId: number) {
    const orderItem = await orderItemService.findByBuyerIdAndProductId(
      buyerId,
      productId,
      OrderItemStatus.Delivered
    );
    return orderItem !== null;
  }

  async create(createReviewInput: CreateReviewInput, buyerId: number) {
    const product = await productService.findById(createReviewInput.productId);
    if (!product) {
      throw new GraphQLError("Product not found", {
        extensions: { Code: "BAD_USER_INPUTS" },
      });
    }
    const authorizedUser = await this.canMakeReview(
      buyerId,
      createReviewInput.productId
    );
    if (!authorizedUser) {
      throw new GraphQLError(
        "You can not review this product, either you have never purchased this product or the order is not yet delivered",
        {
          extensions: { Code: ErrorCode.NOT_AUTHORIZED },
        }
      );
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
    product.rating += createReviewInput.rating / (product.numberOfReviews + 1);
    product.rating = parseFloat(product.rating.toFixed(1));
    product.numberOfReviews += 1;
    console.log(product.id);
    const review = this.reviewRepository.create({
      rating: createReviewInput.rating,
      comment: createReviewInput.comment,
      productId: product.id,
      reviewer: { id: buyerId },
    });
    product.reviews = undefined;
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
