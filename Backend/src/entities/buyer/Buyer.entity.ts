import { ChildEntity } from "typeorm";
import { User } from "../user/User.entity.js";

@ChildEntity()
export class Buyer extends User {}
