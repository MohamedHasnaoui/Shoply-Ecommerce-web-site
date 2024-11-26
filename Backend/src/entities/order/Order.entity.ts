import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  OneToOne,
  ManyToOne,
  Relation,
} from "typeorm";
import { OrderItem, Payment, Buyer } from "../index.js";
import { IsNumber, IsDate, Min, IsString, IsEnum } from "class-validator";
import { OrderStatus } from "../../graphql/types/resolvers-types.js";
@Entity()
export class Order {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  @IsDate({ message: "Invalid date format." })
  orderDate: Date;

  @Column()
  @IsNumber()
  @Min(0, { message: "Total of amount cannot be negative." })
  totalAmount: number;

  @Column()
  @IsString()
  @IsEnum(OrderStatus, {
    message:
      "Status must be one of Pending, Confirmed, Failed, Cancelled, Shipped, Partially Shipped, Delivered, Partially Delivered, Returned,Refunded.",
  })
  status: OrderStatus;
  @OneToMany(() => OrderItem, (orderItem: OrderItem) => orderItem.order)
  orderItems: Relation<OrderItem>[];

  @OneToOne(() => Payment)
  payment: Relation<Payment>;

  @ManyToOne(() => Buyer, (buyer) => buyer.orders)
  buyer: Relation<Buyer>;
}
