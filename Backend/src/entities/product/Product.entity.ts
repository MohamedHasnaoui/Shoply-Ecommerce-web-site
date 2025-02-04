import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  Relation,
  ManyToOne,
} from "typeorm";
import { CartItem, OrderItem, Category, Seller, Review } from "../index.js";
import {
  IsInt,
  IsNumber,
  IsOptional,
  IsString,
  Max,
  Min,
} from "class-validator";

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  @IsOptional()
  reference: string;

  @Column({ type: "float8" })
  @IsNumber()
  price: number;

  @Column()
  @IsString()
  description: string;
  @Column()
  @IsNumber()
  @Min(0, { message: "Quantity cannot be negative" })
  quantity: number;

  @Column({ default: 0, type: "float8" })
  @Min(0) // Minimum rating value is 0
  @Max(5) // Maximum rating value is 5
  @IsOptional()
  rating: number;

  @Column("jsonb")
  images: string[];

  @OneToMany(() => OrderItem, (orderItem: OrderItem) => orderItem.product)
  orderItems: Relation<OrderItem>[];

  @OneToMany(() => CartItem, (cartItem: CartItem) => cartItem.product)
  cartItems: Relation<CartItem>[];

  @ManyToOne(() => Category, (category: Category) => category.products)
  category: Relation<Category>;

  @ManyToOne(() => Seller, (seller) => seller.products)
  owner: Relation<Seller>;

  @OneToMany(() => Review, (review) => review.product)
  reviews: Relation<Review>[];
}
