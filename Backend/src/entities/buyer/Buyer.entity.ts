import { ChildEntity, OneToOne, Relation } from "typeorm";
import { Order } from "../order/Order.entity.js";

import { User } from "../user/User.entity.js";

@ChildEntity()
export class Buyer extends User {
  @OneToOne(() => Order, (order) => order.buyer)
  orders: Relation<Order>;
}
