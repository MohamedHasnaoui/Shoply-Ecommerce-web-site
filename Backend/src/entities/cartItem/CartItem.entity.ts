import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  Relation,
  JoinColumn,
} from "typeorm";
import { Product, ShoppingCart } from "../index.js";
import { IsNumber, Min } from "class-validator";
@Entity()
export class CartItem {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @IsNumber()
  @Min(0, { message: "Quantity cannot be negative." })
  quantity: number;

  @Column({ type: "float8" })
  @IsNumber()
  @Min(0, { message: "Quantity cannot be negative." })
  price: number;
  @ManyToOne(
    () => ShoppingCart,
    (shoppingCart: ShoppingCart) => shoppingCart.cartItems
  )
  shoppingCart: Relation<ShoppingCart>;

  @ManyToOne(() => Product, (product: Product) => product.cartItems)
  product: Relation<Product>;
}
