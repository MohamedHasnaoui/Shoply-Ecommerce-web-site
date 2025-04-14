import { In, MoreThanOrEqual, Repository } from "typeorm";
import { CartItem, OrderItem } from "../entities/index.js";
import { orderService } from "./OrderService.js";
import { GraphQLError } from "graphql";
import { validateOrReject } from "class-validator";
import {
  OrderItemFilter,
  OrderItemsListResult,
  OrderItemStatus,
  PeriodFilter,
} from "../graphql/types/resolvers-types.js";
import { appDataSource } from "../database/data-source.js";
import { productService } from "./productServices.js";
import { cartItemService } from "./CartItemServices.js";
import { dateUtil } from "../../utils/dateUtil.js";

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
  async findBySellerId(
    sellerId: number,
    input: OrderItemFilter
  ): Promise<OrderItemsListResult> {
    const date = dateUtil.getStartDateOfPeriod(input.period);
    const orderItems = await this.orderItemRepository.find({
      where: {
        product: { owner: { id: sellerId } },
        status: input.status,
        createdAt:
          input?.period !== undefined ? MoreThanOrEqual(date) : undefined,
      },
      relations: { product: true },
      order: { createdAt: "DESC" },
      take: input.pageNb ? input?.pageSize : undefined,
      skip:
        input.pageNb && input.pageSize
          ? (input?.pageNb - 1) * input?.pageSize
          : undefined,
    });
    const count = await this.orderItemRepository.count({
      where: {
        product: { owner: { id: sellerId } },
        status: input.status,
        createdAt:
          input?.period !== undefined ? MoreThanOrEqual(date) : undefined,
      },
      relations: { product: true },
      order: { id: "DESC" },
    });
    return { orderItems, count };
  }
  async findByBuyerIdAndProductId(buyerId: number, productId: number) {
    return await this.orderItemRepository.findOne({
      where: { product: { id: productId }, order: { buyer: { id: buyerId } } },
      order: { createdAt: "DESC" },
    });
  }
  async countByProductId(productId: number) {
    return await this.orderItemRepository.count({
      where: { product: { id: productId } },
    });
  }
  async updateStatus(
    orderItem: OrderItem,
    status: OrderItemStatus,
    NextStatus: Record<OrderItemStatus, OrderItemStatus[]>
  ) {
    if (NextStatus[orderItem.status].includes(status)) {
      orderItem.status = status;
      orderItem.updatedAt = new Date();
      return await this.update(orderItem);
    } else {
      throw new GraphQLError("You Can Not Update To This Status", {
        extensions: { code: "INVALID_INPUTS" },
      });
    }
  }
  async countBySellerAndStatus(
    sellerId: number,
    statusArray: OrderItemStatus[],
    period?: PeriodFilter
  ) {
    const date = dateUtil.getStartDateOfPeriod(period);
    return this.orderItemRepository.count({
      where: {
        product: { owner: { id: sellerId } },
        status: In(statusArray),
        updatedAt: period !== undefined ? MoreThanOrEqual(date) : undefined,
      },
    });
  }
  async countAllBySeller(sellerId: number, period?: PeriodFilter) {
    const date = dateUtil.getStartDateOfPeriod(period);
    return this.orderItemRepository.count({
      where: {
        product: { owner: { id: sellerId } },
        updatedAt: period !== undefined ? MoreThanOrEqual(date) : undefined,
      },
    });
  }
}

export const orderItemService = new OrderItemService(
  appDataSource.getRepository(OrderItem)
);
