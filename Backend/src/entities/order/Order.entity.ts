import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  OneToOne,
  ManyToOne,
  Relation,
  JoinColumn,
} from "typeorm";
import { OrderItem, Payment, Buyer } from "../index.js";
import {
  IsNumber,
  IsDate,
  Min,
  IsString,
  IsEnum,
  IsOptional,
} from "class-validator";
import { OrderStatus } from "../../graphql/types/resolvers-types.js";
@Entity()
export class Order {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "float8", default: 0 })
  @IsNumber()
  @Min(0, { message: "Total of amount cannot be negative." })
  @IsOptional()
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

  @Column({ default: new Date() })
  @IsDate({ message: "Invalid date format." })
  @IsOptional()
  createdAt: Date;

  @Column({ default: new Date() })
  @IsDate({ message: "Invalid date format." })
  @IsOptional()
  updatedAt: Date;

  @OneToOne(() => Payment)
  @JoinColumn()
  payment: Relation<Payment>;

  @ManyToOne(() => Buyer, (buyer) => buyer.orders)
  buyer: Relation<Buyer>;
}
