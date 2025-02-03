import { Repository } from "typeorm";
import { CartItem } from "../entities/index.js";
import { GraphQLError } from "graphql";
import { validateOrReject } from "class-validator";
import { appDataSource } from "../database/data-source.js";
import { productService } from "./productServices.js";
import { shoppingCartService } from "./ShoppingCartService.js";
import { CartItemUpdateInput } from "../graphql/types/resolvers-types.js";

export class CartItemService {
  constructor(private cartItemRepository: Repository<CartItem>) {}

  async create(idShoppingCart: number, productId: number, quantity: number) {
    const IsExistingCart = await this.findByProductId(productId);
    if (IsExistingCart) {
      return IsExistingCart;
    }

    const shoppingCart = await shoppingCartService.findById(idShoppingCart);
    if (!shoppingCart) {
      console.error("ShoppingCart Not Found");
      throw new GraphQLError("ShoppingCart Not Found", {
        extensions: { code: "INVALID_INPUTS" },
      });
    }
    console.log("ShoppingCart found:", shoppingCart);

    const product = await productService.findById(productId);
    if (!product) {
      console.error("Product Not Found");
      throw new GraphQLError("Product Not Found", {
        extensions: { code: "INVALID_INPUTS" },
      });
    }
    console.log("Product found:", product);

    if (quantity <= 0) {
      throw new GraphQLError(" Quantity must be >0", {
        extensions: { code: "INVALID INPUT" },
      });
    }

    if (product.quantity < quantity) {
      throw new GraphQLError("Product's Quantity is not enough", {
        extensions: { code: "INVALID INPUT" },
      });
    }

    const cartItem = this.cartItemRepository.create({
      product,
      quantity,
      price: product.price * quantity,
      shoppingCart,
    });

    console.log("CartItem created:", cartItem);

    try {
      await validateOrReject(cartItem);
      console.log("Validation passed!");

      await this.cartItemRepository.save(cartItem);
      console.log("CartItem saved!");

      shoppingCart.totalAmount += cartItem.price;

      await shoppingCartService.update(shoppingCart);
      console.log("ShoppingCart updated!");

      return cartItem;
    } catch (errors) {
      console.error("Validation or DB error:", errors);
      throw new GraphQLError("Validation or DB error", {
        extensions: { errors, code: "BAD_USER_INPUTS" },
      });
    }
  }

  async update(cartItem: CartItemUpdateInput, buyerId: number) {
    try {
      const cartItemRecp = await this.findOneById(cartItem.id);
      if (!cartItemRecp) {
        console.error("CartItem Not Found!");
        throw new GraphQLError("CartItem Not Found", {
          extensions: { code: "INVALID_INPUTS" },
        });
      }

      const isProductExistInCartItem = await this.cartItemRepository.findOne({
        where: { id: cartItem.id, product: { id: cartItem.idProduct } },
        relations: ["product"],
      });

      if (!isProductExistInCartItem) {
        console.error("Product Not Found In cartItem");
        throw new GraphQLError("Product Not Found In CartItem", {
          extensions: { code: "INVALID_INPUTS" },
        });
      }

      if (isProductExistInCartItem.product.quantity < cartItem.quantity) {
        console.error(
          "Product's Quantity is not enough!",
          isProductExistInCartItem.product.quantity
        );
        throw new GraphQLError("Not Enough", {
          extensions: { code: "INVALID_INPUTS" },
        });
      }

      const price = parseFloat(
        (isProductExistInCartItem.product.price * cartItem.quantity).toFixed(2)
      );

      const shoppingCart = await shoppingCartService.getShoppingCartByBuyerId(
        buyerId
      );
      if (!shoppingCart) {
        console.error("ShoppingCart Not Found!");
        throw new GraphQLError("ShoppingCart Not Found", {
          extensions: { code: "INVALID_INPUTS" },
        });
      }

      const total = parseFloat(
        (shoppingCart.totalAmount - cartItemRecp.price + price).toFixed(2)
      );
      shoppingCart.totalAmount = total;

      await shoppingCartService.update(shoppingCart);

      return await this.cartItemRepository.save({
        id: cartItem.id,
        price: price,
        quantity: cartItem.quantity,
      });
    } catch (error) {
      console.error("Error in updateCartItem:", error);

      if (error instanceof GraphQLError) {
        throw error;
      }

      throw new GraphQLError("Internal Server Error", {
        extensions: { code: "INTERNAL_SERVER_ERROR" },
      });
    }
  }

  async delete(cartItemId: number) {
    const cartItem = await this.findOneById(cartItemId);
    if (!cartItem) {
      throw new GraphQLError("CartItem Not Found!:Delete", {
        extensions: { code: "NOT FOUND" },
      });
    }

    const shoppingCart = await shoppingCartService.findById(
      cartItem.shoppingCart.id
    );
    const total = parseFloat(
      (shoppingCart.totalAmount - cartItem.price).toFixed(2)
    );
    shoppingCart.totalAmount = total;

    await shoppingCartService.update(shoppingCart);
    return await this.cartItemRepository.delete(cartItem.id);
  }

  async findOneById(id: number) {
    return await this.cartItemRepository.findOne({
      where: { id },
      relations: { shoppingCart: true, product: true },
    });
  }
  async findByProductId(id: number) {
    return await this.cartItemRepository.findOne({
      where: { product: { id } },
      relations: { shoppingCart: true, product: true },
    });
  }
}

export const cartItemService = new CartItemService(
  appDataSource.getRepository(CartItem)
);
