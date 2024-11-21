import {
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  Relation,
} from "typeorm";
import { Conversation } from "../conversation/Conversation.entity.js";
import { User } from "../user/User.entity.js";

@Entity()
export class Message {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  MessageTimeStamp: Date;

  @Column()
  content: string;

  @Column()
  isRead: boolean;

  @ManyToOne(
    () => Conversation,
    (conversation: Conversation) => conversation.messages
  )
  conversation: Relation<Conversation>;

  @ManyToOne(() => User, (user: User) => user.messages)
  sender: Relation<User>;
}
