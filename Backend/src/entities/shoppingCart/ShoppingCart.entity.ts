import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  Relation,
  OneToOne,
  JoinColumn,
} from "typeorm";
import { Buyer, CartItem } from "../index.js";
import { IsNumber, IsOptional, Min } from "class-validator";
@Entity()
export class ShoppingCart {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "float8", default: 0 })
  @IsNumber()
  @Min(0, { message: "Total of Amount cannot be negative" })
  @IsOptional()
  totalAmount: number;

  @OneToOne(() => Buyer, { onDelete: "CASCADE" })
  @JoinColumn()
  buyer: Buyer;

  @OneToMany(() => CartItem, (cartItem: CartItem) => cartItem.shoppingCart)
  cartItems: Relation<CartItem>[];
}
