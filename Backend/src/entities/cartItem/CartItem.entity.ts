import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { ShoppingCart } from "../shoppingCart/ShoppingCart.entity.js";
@Entity()
export class CartItem {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  quantity: number;

  @Column()
  price: string;
  @ManyToOne(
    () => ShoppingCart,
    (shoppingCart: ShoppingCart) => shoppingCart.cartItems
  )
  shoppingCart: ShoppingCart;
}
