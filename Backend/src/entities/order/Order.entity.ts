import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  ManyToOne,
  ManyToMany,
} from "typeorm";
import { OrderItem } from "../orderItem/OrderItem.entity.js";
import { Payment } from "../payment/Payment.entity.js";
import { Buyer } from "../buyer/Buyer.entity.js";
@Entity()
export class Order {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  orderDate: Date;

  @Column()
  toalAmount: number;

  @Column()
  status: string;
  @OneToMany(() => OrderItem, (orderItem: OrderItem) => orderItem.order)
  orderItems: OrderItem[];

  @ManyToOne(() => Payment, (payment: Payment) => payment.order)
  payment: Payment;

  @ManyToMany(() => Buyer, (buyer) => buyer.orders)
  buyers: Buyer[];
}
