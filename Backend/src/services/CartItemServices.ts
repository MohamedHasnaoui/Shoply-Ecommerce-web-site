import { Repository } from "typeorm";
import { CartItem } from "../entities/index.js";
import { GraphQLError } from "graphql";
import { validateOrReject } from "class-validator";
import { appDataSource } from "../database/data-source.js";
import { productService } from "./productServices.js";
import { shoppingCartService } from "./ShoppingCartService.js";
import { CartItemUpdateInput } from "../graphql/types/resolvers-types.js";
import { ErrorCode } from "../../utils/Errors.js";

export class CartItemService {
  constructor(private cartItemRepository: Repository<CartItem>) {}

  async create(idShoppingCart: number, productId: number, quantity: number) {
    const IsExistingCart = await this.findByShoppingCartProductId(
      idShoppingCart,
      productId
    );
    if (IsExistingCart) {
      return IsExistingCart;
    }

    const shoppingCart = await shoppingCartService.findById(idShoppingCart);
    if (!shoppingCart) {
      console.error("ShoppingCart Not Found");
      throw new GraphQLError("ShoppingCart Not Found", {
        extensions: { code: ErrorCode.BAD_USER_INPUT },
      });
    }

    const product = await productService.findById(productId);
    if (!product) {
      console.error("Product Not Found");
      throw new GraphQLError("Product Not Found", {
        extensions: { code: ErrorCode.BAD_USER_INPUT },
      });
    }

    if (quantity <= 0) {
      throw new GraphQLError(" Quantity must be >0", {
        extensions: { code: ErrorCode.BAD_USER_INPUT },
      });
    }

    if (product.quantity < quantity) {
      throw new GraphQLError(
        "maximum quantity to choose: " + product.quantity,
        {
          extensions: { code: ErrorCode.BAD_USER_INPUT },
        }
      );
    }

    const cartItem = this.cartItemRepository.create({
      product,
      quantity,
      price: product.price * quantity,
      shoppingCart,
    });

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
        extensions: { errors, code: ErrorCode.BAD_USER_INPUT },
      });
    }
  }

  async update(cartItem: CartItemUpdateInput) {
    try {
      const cartItemRecp = await this.findOneById(cartItem.id);

      if (!cartItemRecp) {
        console.error("Product Not Found In cartItem");
        throw new GraphQLError("Product Not Found In CartItem", {
          extensions: { code: "INVALID_INPUTS" },
        });
      }

      if (cartItemRecp.product.quantity < cartItem.quantity) {
        throw new GraphQLError("Product's Quantity is not enough!", {
          extensions: { code: "INVALID_INPUTS" },
        });
      }

      const price = parseFloat(
        (cartItemRecp.product.price * cartItem.quantity).toFixed(2)
      );

      const shoppingCart = await shoppingCartService.findById(
        cartItemRecp.shoppingCart.id
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
      cartItemRecp.price = price;
      cartItemRecp.quantity = cartItem.quantity;
      await this.cartItemRepository.save({
        ...cartItemRecp,
      });
      return cartItemRecp;
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

  async findByShoppingCartProductId(shoppingCartId: number, productId: number) {
    const cartItems = await this.cartItemRepository.find({
      where: {
        shoppingCart: { id: shoppingCartId },
      },
      relations: { shoppingCart: true, product: true },
    });
    return cartItems.find((cartItem) => cartItem.product.id === productId);
  }
  async deleteAllByShoppingCartId(shoppingCartId: number) {
    await this.cartItemRepository.delete({
      shoppingCart: { id: shoppingCartId },
    });
    const shoppingCart = await shoppingCartService.findById(shoppingCartId);
    shoppingCart.totalAmount = 0;
    await shoppingCartService.update(shoppingCart);
    return true;
  }
}

export const cartItemService = new CartItemService(
  appDataSource.getRepository(CartItem)
);
