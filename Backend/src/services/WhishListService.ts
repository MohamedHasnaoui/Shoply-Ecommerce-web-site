import { Repository } from "typeorm";
import { Buyer, WishList } from "../entities/index.js";
import { validateOrReject, ValidationError } from "class-validator";
import { GraphQLError } from "graphql";
import { appDataSource } from "../database/data-source.js";
import { productService } from "./productServices.js";

export class WhishListService {
  constructor(private wishListRepository: Repository<WishList>) {}
  async create(buyer: Buyer) {
    const wishList = this.wishListRepository.create({ buyer });
    console.log("WishList before saving:", wishList);
    await validateOrReject(wishList);
    await this.wishListRepository.save(wishList);
    return wishList.id;
  }

  async getWishListByBuyerId(buyerId: number) {
    const wishList = await this.wishListRepository.findOne({
      where: { buyer: { id: buyerId } },
      relations: { products: true },
    });

    if (wishList === null) {
      throw new GraphQLError("WishList not found for this Buyer", {
        extensions: { code: "NOT_FOUND" },
      });
    }

    return wishList;
  }

  async addProductToWishList(buyerId: number, productId: number) {
    const wishList = await this.getWishListByBuyerId(buyerId);
    const product = await productService.findById(productId);
    if (product === null) {
      throw new GraphQLError("Product not found", {
        extensions: { code: "NOT_FOUND" },
      });
    }
    wishList.products.push(product);
    return await this.wishListRepository.save(wishList);
  }
  async deleteProductFromWishList(buyerId: number, productId: number) {
    const wishList = await this.wishListRepository.findOne({
      where: { buyer: { id: buyerId } },
      relations: ["products"],
    });

    if (!wishList) {
      throw new GraphQLError("Wishlist not found", {
        extensions: { code: "NOT_FOUND" },
      });
    }

    const productIndex = wishList.products.findIndex((p) => p.id === productId);
    if (productIndex === -1) {
      throw new GraphQLError("Product not in wishlist", {
        extensions: { code: "NOT_FOUND" },
      });
    }

    wishList.products.splice(productIndex, 1);

    await this.wishListRepository.save(wishList);

    return true;
  }
}

export const whishListService = new WhishListService(
  appDataSource.getRepository(WishList)
);
