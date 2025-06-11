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
  VerificationToken,
} from "../entities/index.js";
import { SeedDB1749579231936 } from "../migrations/1749579231936-SeedDB.js";

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
    VerificationToken,
  ],
  logging: false,
  synchronize: true,
  migrations: [SeedDB1749579231936],
  subscribers: [],
});
