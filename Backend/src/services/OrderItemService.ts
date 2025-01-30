import { Repository } from "typeorm";
import { OrderItem, Product } from "../entities";
import { orderService } from "./OrderService";
import { GraphQLError } from "graphql";
import { validateOrReject } from "class-validator";
import { OrderItemStatus } from "../graphql/types/resolvers-types";
import { appDataSource } from "../database/data-source";
import { productService } from "./productServices";

export class OrderItemService {
  constructor(private orderItemRepository: Repository<OrderItem>) {}
  async create(orderId: number, productId: number, quantity: number) {
    const order = await orderService.findOneById(orderId);

    if (order === null) {
      throw new GraphQLError("Order Not Found", {
        extensions: { code: "INVALID_INPUTS" },
      });
    }
    const product = await productService.findById(productId);
    if (product === null) {
      throw new GraphQLError("Product Not Found", {
        extensions: { code: "INVALID_INPUTS" },
      });
    }
    const orderItem = this.orderItemRepository.create({
      order,
      product,
      quantity,
      status: OrderItemStatus.Pending,
      price: product.price * quantity,
    });
    try {
      await validateOrReject(orderItem);
      await this.orderItemRepository.save(orderItem);
      order.orderItems.push(orderItem);
      await orderService.update(order);
      return orderItem;
    } catch (errors) {
      throw new GraphQLError("validation error", {
        extensions: { errors, code: "BAD USER INPUTS" },
      });
    }
  }
  async update(orderItem: OrderItem) {
    await this.orderItemRepository.update({ id: orderItem.id }, orderItem);
    const order = orderService.update(orderItem.order);
    return { orderItem, order };
  }
  async findOneById(id: number) {
    await this.orderItemRepository.findOneBy({ id });
  }
  async findBySellerId(sellerId: number) {
    await this.orderItemRepository.find({
      where: { product: { owner: { id: sellerId } } },
      order: { createdAt: "DESC" },
    });
  }
}

export const orderItemService = new OrderItemService(
  appDataSource.getRepository(OrderItem)
);
