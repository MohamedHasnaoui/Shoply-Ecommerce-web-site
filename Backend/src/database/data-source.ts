import * as dotenv from "dotenv";
dotenv.config();
import { DataSource } from "typeorm";
import {
  User,
  Buyer,
  CartItem,
  Category,
  Conversation,
  Message,
  Order,
  OrderItem,
  Payment,
  Product,
  Seller,
  ShoppingCart,
  WishList,
  Review,
} from "../entities/index.js";

export const appDataSource = new DataSource({
  type: "postgres",
  host: "localhost",
  port: Number(process.env.PG_PORT),
  username: process.env.PG_NAME,
  password: process.env.PG_PASSWORD,
  database: process.env.DB_NAME,
  entities: [
    User,
    Order,
    Buyer,
    Seller,
    OrderItem,
    Payment,
    CartItem,
    ShoppingCart,
    Product,
    Category,
    WishList,
    Conversation,
    Message,
    Review,
  ],
  logging: false,
  synchronize: true,
});
