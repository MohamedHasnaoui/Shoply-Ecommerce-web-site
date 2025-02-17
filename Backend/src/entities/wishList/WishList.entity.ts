import {
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  Relation,
} from "typeorm";
import { Product, Buyer } from "../index.js";

@Entity()
export class WishList {
  @PrimaryGeneratedColumn()
  id: number;
  @OneToOne(() => Buyer)
  @JoinColumn()
  buyer: Buyer;
  @ManyToMany(() => Product)
  @JoinTable()
  products: Relation<Product[]>;
}
