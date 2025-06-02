import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  Relation,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";
import { Product, ShoppingCart } from "../index.js";
import { IsNumber, IsOptional, Min } from "class-validator";

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

  @CreateDateColumn() // ← Remplacez par ceci
  createdAt: Date;

  @UpdateDateColumn() // ← Remplacez par ceci
  updatedAt: Date;

  @ManyToOne(
    () => ShoppingCart,
    (shoppingCart: ShoppingCart) => shoppingCart.cartItems
  )
  shoppingCart: Relation<ShoppingCart>;

  @ManyToOne(() => Product, (product: Product) => product.cartItems)
  product: Relation<Product>;
}
