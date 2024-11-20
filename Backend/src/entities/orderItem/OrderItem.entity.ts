import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  Relation,
} from "typeorm";
import { Order } from "../order/Order.entity.js";
import { Product } from "../product/Product.entity.js";
import { IsNumber, Min } from "class-validator";

@Entity()
export class OrderItem {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @IsNumber()
  @Min(0, { message: "Quantity cannot be negative." })
  quantity: number;

  @Column()
  @IsNumber()
  @Min(0, { message: "Quantity cannot be negative." })
  price: number;
  @ManyToOne(() => Order, (order: Order) => order.orderItems)
  order: Relation<Order>;

  @ManyToOne(() => Product, (product: Product) => product.orderItems)
  product: Relation<Product>;
}
