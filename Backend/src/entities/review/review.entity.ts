import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
  Relation,
} from "typeorm";
import { IsInt, IsString, IsNotEmpty, Min, Max } from "class-validator";
import { Buyer, Product } from "../index.js";

@Entity()
export class Review {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @IsInt()
  @Min(0) // Minimum rating value is 0
  @Max(5) // Maximum rating value is 5
  rating: number;

  @Column()
  @IsString() // Comment should be a string
  @IsNotEmpty() // Comment cannot be empty
  comment: string;

  @CreateDateColumn()
  createdAt: Date;

  @CreateDateColumn()
  updatedAt: Date;

  @ManyToOne(() => Buyer, (buyer) => buyer.reviews)
  reviewer: Relation<Buyer>;

  @ManyToOne(() => Product, (product) => product.reviews)
  product: Relation<Product>;
}
