import { DataSource } from "typeorm";
import { User } from "../entities/user/User.entity.js";
import { Buyer } from "../entities/buyer/Buyer.entity.js";
import { Seller } from "../entities/seller/Seller.entity.js";
import { Order } from "../entities/order/Order.entity.js";
import { OrderItem } from "../entities/orderItem/OrderItem.entity.js";
import { Payment } from "../entities/payment/Payment.entity.js";
import { CartItem } from "../entities/cartItem/CartItem.entity.js";
import { ShoppingCart } from "../entities/shoppingCart/ShoppingCart.entity.js";
export const appDataSource = new DataSource({
  type: "postgres",
  host: "localhost",
  port: Number(process.env.PG_PORT),
  username: process.env.PG_NAME,
  password: process.env.PG_PASSWORD,
  database: "test",
  entities: [
    User,
    Order,
    Buyer,
    Seller,
    OrderItem,
    Payment,
    CartItem,
    ShoppingCart,
  ],
  logging: false,
  synchronize: true,
});
