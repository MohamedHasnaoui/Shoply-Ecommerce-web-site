import { Repository } from "typeorm";
import { CartItem, OrderItem } from "../entities/index.js";
import { orderService } from "./OrderService.js";
import { GraphQLError } from "graphql";
import { validateOrReject } from "class-validator";
import { OrderItemStatus } from "../graphql/types/resolvers-types.js";
import { appDataSource } from "../database/data-source.js";
import { productService } from "./productServices.js";
import { cartItemService } from "./CartItemServices.js";

export class OrderItemService {
  constructor(private orderItemRepository: Repository<OrderItem>) {}
  async create(cartItem: CartItem, orderId: number) {
    const order = await orderService.findOneById(orderId);

    if (order === null) {
      throw new GraphQLError("Order Not Found", {
        extensions: { code: "INVALID_INPUTS" },
      });
    }
    const product = await productService.findById(cartItem.product.id);
    if (product === null) {
      throw new GraphQLError("Product Not Found", {
        extensions: { code: "INVALID_INPUTS" },
      });
    }
    if (product.quantity < cartItem.quantity) {
      cartItem.quantity = product.quantity;
      await cartItemService.update({
        id: cartItem.id,
        quantity: product.quantity,
      });
      throw new GraphQLError(
        "Product quantity is less than the quantity you want to order: " +
          product.name,
        {
          extensions: { code: "INVALID_INPUTS" },
        }
      );
    }
    product.quantity -= cartItem.quantity;
    const orderItem = this.orderItemRepository.create({
      order,
      productId: product.id,
      product: product,
      quantity: cartItem.quantity,
      status: OrderItemStatus.Pending,
      price: cartItem.price,
    });
    try {
      await validateOrReject(orderItem);
      await this.orderItemRepository.save(orderItem);
      await productService.update(product);
      return orderItem;
    } catch (errors) {
      throw new GraphQLError("validation error", {
        extensions: { errors, code: "BAD USER INPUTS" },
      });
    }
  }
  async update(orderItem: OrderItem) {
    await this.orderItemRepository.update({ id: orderItem.id }, orderItem);
    const order = await orderService.findOneById(orderItem.order.id);
    await orderService.update(order);
    return orderItem;
  }
  async findOneById(id: number) {
    return await this.orderItemRepository.findOne({
      where: { id },
      relations: { product: { owner: true }, order: { buyer: true } },
    });
  }
  async findBySellerId(sellerId: number) {
    return await this.orderItemRepository.find({
      where: { product: { owner: { id: sellerId } } },
      relations: { product: true },
      order: { createdAt: "DESC" },
    });
  }
  async findByBuyerIdAndProductId(buyerId: number, productId: number) {
    return await this.orderItemRepository.findOne({
      where: { product: { id: productId }, order: { buyer: { id: buyerId } } },
      order: { createdAt: "DESC" },
    });
  }
}

export const orderItemService = new OrderItemService(
  appDataSource.getRepository(OrderItem)
);
