import { DataSource } from "typeorm";
import { User } from "../entities/user/User.entity.js";
import { Buyer } from "../entities/buyer/Buyer.entity.js";
import { Seller } from "../entities/seller/Seller.entity.js";

export const appDataSource = new DataSource({
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "postgres",
  password: "Mohamed@14",
  database: "main",
  entities: [User, Buyer, Seller],
  logging: false,
  synchronize: true,
});
