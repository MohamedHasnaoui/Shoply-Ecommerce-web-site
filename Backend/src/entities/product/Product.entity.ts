import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  Relation,
} from "typeorm";
import { CartItem } from "../cartItem/CartItem.entity.js";
import { OrderItem } from "../orderItem/OrderItem.entity.js";
import { IsNumber, IsString, Min } from "class-validator";

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  reference: string;

  @Column()
  @IsNumber()
  price: number;
  @Column()
  @IsString()
  description: string;
  @Column()
  @IsNumber()
  @Min(0, { message: "Quantity cannot be negative" })
  quantity: number;
  @OneToMany(() => OrderItem, (orderItem: OrderItem) => orderItem.product)
  orderItems: Relation<OrderItem>[];

  @OneToMany(() => CartItem, (cartItem: CartItem) => cartItem.product)
  cartItems: Relation<CartItem>[];
}
