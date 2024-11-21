import { ChildEntity, OneToMany, OneToOne, Relation } from "typeorm";
import { Order } from "../order/Order.entity.js";

import { User } from "../user/User.entity.js";
import { ShoppingCart } from "../shoppingCart/ShoppingCart.entity.js";
import { Conversation } from "../conversation/Conversation.entity.js";
import { WishList } from "../wishList/WishList.entity.js";

@ChildEntity()
export class Buyer extends User {
  @OneToOne(() => Order, (order) => order.buyer)
  orders: Relation<Order>;

  @OneToOne(() => ShoppingCart)
  shopingCart: Relation<ShoppingCart>;

  @OneToMany(
    () => Conversation,
    (conversation: Conversation) => conversation.seller
  )
  conversations: Relation<Conversation>[];

  @OneToOne(() => WishList)
  wishList: Relation<WishList>;
}
