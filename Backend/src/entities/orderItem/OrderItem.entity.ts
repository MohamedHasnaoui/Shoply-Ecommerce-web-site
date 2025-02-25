import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  Relation,
  JoinColumn,
} from "typeorm";
import { Order, Product, Seller } from "../index.js";
import { IsNumber, Min, IsEnum, IsDate, IsOptional } from "class-validator";
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
  @Column({ type: "float8" })
  @IsNumber()
  @Min(0, { message: "Quantity cannot be negative." })
  price: number;

  @Column({ default: new Date() })
  @IsDate({ message: "Invalid date format." })
  @IsOptional()
  createdAt: Date;

  @Column({ default: new Date() })
  @IsDate({ message: "Invalid date format." })
  @IsOptional()
  updatedAt: Date;

  @ManyToOne(() => Order, (order: Order) => order.orderItems)
  order: Relation<Order>;

  @Column()
  productId: number;

  // @OneToOne(() => Seller)
  @ManyToOne(() => Product, (product: Product) => product.orderItems)
  @JoinColumn({ name: "productId" })
  product: Relation<Product>;
}
