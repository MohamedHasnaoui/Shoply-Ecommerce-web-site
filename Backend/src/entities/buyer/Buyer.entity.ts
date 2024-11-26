import {
  ChildEntity,
  JoinColumn,
  OneToMany,
  OneToOne,
  Relation,
} from "typeorm";
import {
  Order,
  User,
  ShoppingCart,
  Conversation,
  WishList,
  Review,
} from "../index.js";
@ChildEntity()
export class Buyer extends User {
  @OneToMany(() => Order, (order) => order.buyer)
  orders: Relation<Order>[];

  @OneToOne(() => ShoppingCart)
  @JoinColumn()
  shopingCart: Relation<ShoppingCart>;

  @OneToMany(
    () => Conversation,
    (conversation: Conversation) => conversation.seller
  )
  conversations: Relation<Conversation>[];

  @OneToOne(() => WishList)
  @JoinColumn()
  wishList: Relation<WishList>;

  @OneToMany(() => Review, (review) => review.reviewer)
  reviews: Relation<Review>[];
}
