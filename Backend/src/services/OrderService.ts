import { Repository } from "typeorm";
import { Order } from "../entities/index.js";
import { userService } from "./userService.js";
import { GraphQLError } from "graphql";
import { paymentService } from "./PaymentService.js";
import { validateOrReject } from "class-validator";
import { appDataSource } from "../database/data-source.js";
import {
  OrderItemStatus,
  Role,
  OrderStatus,
} from "../graphql/types/resolvers-types.js";
import { shoppingCartService } from "./ShoppingCartService.js";
import { orderItemService } from "./OrderItemService.js";
import { cartItemService } from "./CartItemServices.js";

export class OrderService {
  constructor(private orderRepository: Repository<Order>) {}
  async create(userId: number, paymentId: number) {
    const user = await userService.findOneById(userId);
    if (user.role != Role.Buyer) {
      throw new GraphQLError("Not Authorized", {
        extensions: { code: "UNAUTHORIZED" },
      });
    }
    const payment = await paymentService.findOneById(paymentId);
    if (payment === null) {
      throw new GraphQLError("Payment Not Found", {
        extensions: { code: "INVALID_INPUTS" },
      });
    }
    const shoppingCart = await shoppingCartService.getShoppingCartByBuyerId(
      userId
    );
    const order = this.orderRepository.create({
      buyer: user,
      status: OrderStatus.Pending,
      totalAmount: shoppingCart.totalAmount,
      payment,
      orderItems: [],
    });

    try {
      await validateOrReject(order);
      const returnedOrder = await this.orderRepository.save(order);
      await Promise.all(
        shoppingCart.cartItems.map(async (cartItem) => {
          const orderItem = await orderItemService.create(
            cartItem,
            returnedOrder.id
          );
          returnedOrder.orderItems.push(orderItem);
        })
      );
      await cartItemService.deleteAllByShoppingCartId(shoppingCart.id);
      return returnedOrder;
    } catch (errors) {
      throw new GraphQLError("validation error", {
        extensions: { errors, code: "BAD USER INPUTS" },
      });
    }
  }
  async update(order: Order) {
    const totalItems = order.orderItems.length;
    let orderStatut = order.status;
    const orderStatusMap = new Map<OrderItemStatus, number>();
    for (const item of order.orderItems) {
      orderStatusMap.set(
        item.status,
        (orderStatusMap.get(item.status) ?? 0) + 1
      );
    }
    if (orderStatusMap.has(OrderItemStatus.Delivered)) {
      orderStatut = OrderStatus.Partiallydelivered;
      if (orderStatusMap.get(OrderItemStatus.Delivered) === totalItems) {
        orderStatut = OrderStatus.Delivered;
      }
    } else if (orderStatusMap.has(OrderItemStatus.Shipped)) {
      orderStatut = OrderStatus.Partiallyshipped;
      if (orderStatusMap.get(OrderItemStatus.Shipped) == totalItems) {
        orderStatut = OrderStatus.Shipped;
      }
    } else if (orderStatusMap.has(OrderItemStatus.Confirmed)) {
      if (orderStatusMap.get(OrderItemStatus.Confirmed) == totalItems) {
        orderStatut = OrderStatus.Confirmed;
      }
    } else if (orderStatusMap.has(OrderItemStatus.Cancelled)) {
      if (orderStatusMap.get(OrderItemStatus.Cancelled) == totalItems) {
        orderStatut = OrderStatus.Cancelled;
      }
    } else if (orderStatusMap.has(OrderItemStatus.Failed)) {
      if (orderStatusMap.get(OrderItemStatus.Refunded) == totalItems) {
        orderStatut = OrderStatus.Refunded;
      }
    } else if (orderStatusMap.has(OrderItemStatus.Refunded)) {
      if (orderStatusMap.get(OrderItemStatus.Refunded) == totalItems) {
        orderStatut = OrderStatus.Refunded;
      }
    }
    order.status = orderStatut;
    order.updatedAt = new Date();
    await this.orderRepository.save(order);
    return order;
  }
  async findOneById(id: number) {
    return await this.orderRepository.findOne({
      where: { id },
      relations: { orderItems: true, buyer: true },
    });
  }
  async findByBuyerId(id: number, pageNb?: number, pageSize?: number) {
    if (pageNb && pageSize) {
      return await this.orderRepository.find({
        where: { buyer: { id } },
        order: { createdAt: "ASC" },
        relations: { orderItems: { product: true } },
        skip: (pageNb - 1) * pageSize,
        take: pageSize,
      });
    }
    const res = await this.orderRepository.find({
      where: { buyer: { id } },
      order: { createdAt: "ASC" },
      relations: { orderItems: { product: true } },
    });
    return res;
  }
}

export const orderService = new OrderService(
  appDataSource.getRepository(Order)
);
