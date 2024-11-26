import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  Relation,
} from "typeorm";
import { Order, Product } from "../index.js";
import { IsNumber, Min, IsEnum } from "class-validator";
import { OrderItemStatus } from "../../graphql/types/resolvers-types.js";
@Entity()
export class OrderItem {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @IsNumber()
  @Min(0, { message: "Quantity cannot be negative." })
  quantity: number;

  @Column()
  @IsEnum(OrderItemStatus, {
    message: "State of an order item must be Pending,Shipped or Delivered ",
  })
  status: OrderItemStatus;
  @Column()
  @IsNumber()
  @Min(0, { message: "Quantity cannot be negative." })
  price: number;
  @ManyToOne(() => Order, (order: Order) => order.orderItems)
  order: Relation<Order>;

  @ManyToOne(() => Product, (product: Product) => product.orderItems)
  product: Relation<Product>;
}
