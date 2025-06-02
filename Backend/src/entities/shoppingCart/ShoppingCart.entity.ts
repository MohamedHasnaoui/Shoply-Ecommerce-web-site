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
  @IsNumber(
    { allowNaN: false, allowInfinity: false },
    { message: "Total amount must be a valid number" }
  )
  totalAmount: number;

  @Column({ default: new Date() })
  @IsOptional()
  createdAt: Date;

  @Column({ default: new Date() })
  @IsOptional()
  updatedAt: Date;
  @OneToOne(() => Buyer, { onDelete: "CASCADE" })
  @JoinColumn()
  buyer: Buyer;

  @OneToMany(() => CartItem, (cartItem: CartItem) => cartItem.shoppingCart)
  cartItems: Relation<CartItem>[];
}
