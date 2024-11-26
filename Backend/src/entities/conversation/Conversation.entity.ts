import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  Relation,
} from "typeorm";
import { IsDate, IsNotEmpty } from "class-validator"; // Importing class-validator decorators
import { Seller, Buyer, Message } from "../index.js";

@Entity()
export class Conversation {
  @PrimaryGeneratedColumn()
  id: number;

  // Validate that lastMessageTimeStamp is a valid date and not empty
  @Column()
  @IsNotEmpty()
  @IsDate() // Ensures the field is a valid date
  lastMessageTimeStamp: Date;

  @ManyToOne(() => Seller, (seller: Seller) => seller.conversations)
  seller: Relation<Seller>;

  @ManyToOne(() => Buyer, (buyer: Buyer) => buyer.conversations)
  buyer: Relation<Buyer>;

  @OneToMany(() => Message, (message: Message) => message.conversation)
  messages: Relation<Message>[];
}
