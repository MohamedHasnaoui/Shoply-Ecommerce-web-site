import { IsNumber, IsString, Length } from "class-validator";
import { ChildEntity, Column, OneToMany, Relation } from "typeorm";
import { User } from "../user/User.entity.js";
import { Conversation, Product } from "../index.js";

@ChildEntity()
export class Seller extends User {
  @Column()
  @IsString()
  @Length(2, 20, { message: "storeName must be between 2 and 50 characters." })
  storeName: string;

  @Column()
  @IsNumber(null, {
    message: "storeBalance must be between 2 and 50 characters.",
  })
  storeBalance: number;

  @OneToMany(
    () => Conversation,
    (conversation: Conversation) => conversation.seller
  )
  conversations: Relation<Conversation>[];

  @OneToMany(() => Product, (product) => product.owner)
  products: Relation<Product>[];
}
