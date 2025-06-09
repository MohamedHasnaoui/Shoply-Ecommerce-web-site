import {
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  Relation,
} from "typeorm";
import { IsString, IsNotEmpty, Length } from "class-validator";
import { Product } from "../index.js";

@Entity()
export class Category {
  @PrimaryGeneratedColumn()
  id: number;
  // Validate that name is a non-empty string and has a minimum length
  @Column({ unique: true })
  @IsString()
  @IsNotEmpty()
  @Length(3, 50) // Name must be between 3 and 50 characters
  name: string;
  // Validate that description is a non-empty string and has a minimum length
  @Column()
  @IsString()
  @IsNotEmpty()
  @Length(10, 255) // Description must be between 10 and 255 characters
  description: string;
  @Column({ default: "default.jpg" })
  @IsString()
  image: string;

  @OneToMany(() => Product, (product: Product) => product.category)
  products: Relation<Product>[];
}
