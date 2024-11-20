import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Order } from "../order/Order.entity.js";

@Entity()
export class Payment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  paymentDate: Date;

  @Column()
  paymentType: string;
  @OneToMany(() => Order, (order: Order) => order.payment)
  order: Order[];
}
