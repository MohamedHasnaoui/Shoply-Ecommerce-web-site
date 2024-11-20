import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { CartItem } from "../cartItem/CartItem.entity.js";
@Entity()
export class ShoppingCart {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  toalAmount: number;
  @OneToMany(() => CartItem, (cartItem: CartItem) => cartItem.shoppingCart)
  cartItems: CartItem[];
}
