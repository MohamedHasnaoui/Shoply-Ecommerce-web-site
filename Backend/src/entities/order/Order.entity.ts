import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  OneToOne,
  ManyToOne,
  Relation,
} from "typeorm";
import { OrderItem } from "../orderItem/OrderItem.entity.js";
import { Payment } from "../payment/Payment.entity.js";
import { Buyer } from "../buyer/Buyer.entity.js";
import { IsNumber, IsDate, Min, IsString } from "class-validator";
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
  status: string;
  @OneToMany(() => OrderItem, (orderItem: OrderItem) => orderItem.order)
  orderItems: Relation<OrderItem>[];

  @OneToOne(() => Payment)
  payment: Relation<Payment>;

  @ManyToOne(() => Buyer, (buyer) => buyer.orders)
  buyer: Relation<Buyer>;
}