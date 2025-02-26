import {
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  Relation,
} from "typeorm";
import { Buyer, Product } from "../index.js";

@Entity()
export class WishList {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(() => Buyer, { onDelete: "CASCADE" })
  @JoinTable()
  buyer: Buyer;
  @ManyToMany(() => Product)
  @JoinTable()
  products: Relation<Product[]>;
}
