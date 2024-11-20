import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import { Order } from "../order/Order.entity.js";

@Entity()
export class OrderItem {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  quantity: number;

  @Column()
  price: number;
  @ManyToOne(() => Order, (order: Order) => order.orderItems)
  @JoinColumn({ name: "orderId" })
  order: Order;
}
