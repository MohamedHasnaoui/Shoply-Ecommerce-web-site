import { IsNumber, IsString, Length } from "class-validator";
import { ChildEntity, Column } from "typeorm";
import { User } from "../user/User.entity.js";

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
}
