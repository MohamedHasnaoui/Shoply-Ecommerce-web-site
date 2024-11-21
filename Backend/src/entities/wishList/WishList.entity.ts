import {
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
  Relation,
} from "typeorm";
import { Product } from "../product/Product.entity.js";

@Entity()
export class WishList {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToMany(() => Product)
  @JoinTable()
  products: Relation<Product[]>;
}
