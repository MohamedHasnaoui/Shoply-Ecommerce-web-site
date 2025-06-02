import { Repository } from "typeorm";
import { Buyer, ShoppingCart } from "../entities/index.js";
import { validateOrReject, ValidationError } from "class-validator";
import { GraphQLError } from "graphql";
import { appDataSource } from "../database/data-source.js";
import { cartItemService } from "./CartItemServices.js";
export class ShoppingCartService {
  constructor(private shoppingCartRepository: Repository<ShoppingCart>) {}

  async create(buyer: Buyer) {
    const shoppingCart = this.shoppingCartRepository.create({
      buyer,
      totalAmount: 0,
    });

    try {
      console.log("ShoppingCart before saving:", shoppingCart);

      await validateOrReject(shoppingCart);

      await this.shoppingCartRepository.save(shoppingCart);
      return shoppingCart.id;
    } catch (error) {
      console.log(error);
      if (error instanceof ValidationError) {
        throw new GraphQLError("Validation error", {
          extensions: { error, code: "Validation ERROR" },
        });
      } else {
        throw new GraphQLError("Database error", {
          extensions: { error, code: "DATABASE ERROR" },
        });
      }
    }
  }
  async getShoppingCartByBuyerId(buyerId: number) {
    const shoppingCart = await this.shoppingCartRepository.findOne({
      where: { buyer: { id: buyerId } },
      relations: {
        cartItems: {
          product: {
            category: true,
          },
        },
      },
      order: {
        cartItems: {
          createdAt: "ASC",
        },
      },
    });
    if (shoppingCart === null) {
      throw new GraphQLError("ShoppingCart not found for this Buyer", {
        extensions: { code: "NOT_FOUND" },
      });
    }

    return shoppingCart;
  }

  async cancelShoppingCart(buyerId: number) {
    const shoppingCart = await this.getShoppingCartByBuyerId(buyerId);

    await Promise.all(
      shoppingCart.cartItems.map((cart) => cartItemService.delete(cart.id))
    );
    return true;
  }

  async findById(id: number) {
    return await this.shoppingCartRepository.findOneBy({ id });
  }

  async update(shoppingCart: ShoppingCart) {
    try {
      await validateOrReject(shoppingCart);
      shoppingCart.updatedAt = new Date();
      return await this.shoppingCartRepository.save(shoppingCart);
    } catch (error) {
      if (error instanceof ValidationError) {
        throw new GraphQLError("Validation error", {
          extensions: { error, code: "Validation ERROR" },
        });
      } else {
        throw new GraphQLError("Database error", {
          extensions: { error, code: "DATABASE ERROR" },
        });
      }
    }
  }
}

export const shoppingCartService = new ShoppingCartService(
  appDataSource.getRepository(ShoppingCart)
);
