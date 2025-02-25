import {
  ChildEntity,
  JoinColumn,
  OneToMany,
  OneToOne,
  Relation,
  Column,
} from "typeorm";
import { Order, User, Conversation, WishList, Review } from "../index.js";
import { IsString } from "class-validator";
@ChildEntity()
export class Buyer extends User {
  // @Column()
  // @IsString()
  // stripeCustomerId!: string;
  @OneToMany(() => Order, (order) => order.buyer)
  orders: Relation<Order>[];

  @OneToMany(
    () => Conversation,
    (conversation: Conversation) => conversation.seller
  )
  conversations: Relation<Conversation>[];

  @OneToMany(() => Review, (review) => review.reviewer)
  reviews: Relation<Review>[];
}
