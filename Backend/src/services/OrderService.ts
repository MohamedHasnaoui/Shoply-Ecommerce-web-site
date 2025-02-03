import { Repository } from "typeorm";
import { Order } from "../entities";
import { userService } from "./userService.js";

import { GraphQLError } from "graphql";
import { paymentService } from "./PaymentService";
import { validateOrReject } from "class-validator";
import { appDataSource } from "../database/data-source.js";
import {
  OrderItemStatus,
  Role,
  OrderStatus,
} from "../graphql/types/resolvers-types";

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
    const order = this.orderRepository.create({
      buyer: user,
      status: OrderStatus.Pending,
      totalAmount: 0,
      payment,
    });
    try {
      await validateOrReject(order);
      return await this.orderRepository.save(order);
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
      orderStatusMap[item.status] = (orderStatusMap[item.status] ?? 0) + 1;
    }
    if (orderStatusMap.has(OrderItemStatus.Delivered)) {
      orderStatut = OrderStatus.Partiallydelivered;
      if (orderStatusMap[OrderItemStatus.Delivered] == totalItems) {
        orderStatut = OrderStatus.Delivered;
      }
    } else if (orderStatusMap.has(OrderItemStatus.Shipped)) {
      orderStatut = OrderStatus.Partiallyshipped;
      if (orderStatusMap[OrderItemStatus.Shipped] == totalItems) {
        orderStatut = OrderStatus.Shipped;
      }
    } else if (orderStatusMap.has(OrderItemStatus.Confirmed)) {
      if (orderStatusMap[OrderItemStatus.Confirmed] == totalItems) {
        orderStatut = OrderStatus.Confirmed;
      }
    } else if (orderStatusMap.has(OrderItemStatus.Cancelled)) {
      if (orderStatusMap[OrderItemStatus.Cancelled] == totalItems) {
        orderStatut = OrderStatus.Cancelled;
      }
    } else if (orderStatusMap.has(OrderItemStatus.Failed)) {
      if (orderStatusMap[OrderItemStatus.Failed] == totalItems) {
        orderStatut = OrderStatus.Failed;
      }
    } else if (orderStatusMap.has(OrderItemStatus.Refunded)) {
      if (orderStatusMap[OrderItemStatus.Refunded] == totalItems) {
        orderStatut = OrderStatus.Refunded;
      }
    } else if (orderStatusMap.has(OrderItemStatus.Returned)) {
      if (orderStatusMap[OrderItemStatus.Returned] == totalItems) {
        orderStatut = OrderStatus.Refunded;
      }
    }
    order.status = orderStatut;
    order.updatedAt = new Date();
    await this.orderRepository.update({ id: order.id }, order);
    return order;
  }
  async findOneById(id: number) {
    return await this.orderRepository.findOne({
      where: { id },
      relations: { orderItems: true },
    });
  }
  async findByBuyerId(id: number, pageNb?: number, pageSize?: number) {
    if (pageNb && pageSize) {
      return await this.orderRepository.find({
        where: { buyer: { id } },
        order: { createdAt: "ASC" },
        relations: { orderItems: true },
        skip: (pageNb - 1) * pageSize,
        take: pageSize,
      });
    }
    return await this.orderRepository.find({
      where: { buyer: { id } },
      order: { createdAt: "ASC" },
      relations: { orderItems: true },
    });
  }
}

export const orderService = new OrderService(
  appDataSource.getRepository(Order)
);
