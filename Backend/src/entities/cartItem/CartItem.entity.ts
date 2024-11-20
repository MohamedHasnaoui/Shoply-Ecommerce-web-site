import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  Relation,
} from "typeorm";
import { Product } from "../product/Product.entity.js";

import { ShoppingCart } from "../shoppingCart/ShoppingCart.entity.js";
import { IsNumber, Min } from "class-validator";
@Entity()
export class CartItem {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @IsNumber()
  @Min(0, { message: "Quantity cannot be negative." })
  quantity: number;

  @Column()
  @IsNumber()
  @Min(0, { message: "Quantity cannot be negative." })
  price: number;
  @ManyToOne(
    () => ShoppingCart,
    (shoppingCart: ShoppingCart) => shoppingCart.cartItems
  )
  shoppingCart: ShoppingCart;
  @ManyToOne(() => Product, (product: Product) => product.cartItems)
  product: Relation<Product>;
}
