import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  Relation,
} from "typeorm";
import { Seller } from "../seller/Seller.entity.js";
import { Buyer } from "../buyer/Buyer.entity.js";
import { Message } from "../message/Message.entity.js";

@Entity()
export class Conversation {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  lastMessageTimeStamp: Date;

  @ManyToOne(() => Seller, (seller: Seller) => seller.conversations)
  seller: Relation<Seller>;

  @ManyToOne(() => Buyer, (buyer: Buyer) => buyer.conversations)
  buyer: Buyer;

  @OneToMany(() => Message, (message: Message) => message.conversation)
  messages: Relation<Message>[];
}
