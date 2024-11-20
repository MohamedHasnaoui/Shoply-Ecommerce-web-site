import { ChildEntity, ManyToMany, JoinTable } from "typeorm";
import { Order } from "../order/Order.entity.js";

import { User } from "../user/User.entity.js";

@ChildEntity()
export class Buyer extends User {
  @ManyToMany(() => Order, (order) => order.buyers)
  @JoinTable()
  orders: Order[];
}
