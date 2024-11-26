import {
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  Relation,
} from "typeorm";
import {
  IsDate,
  IsNotEmpty,
  IsString,
  IsBoolean,
  Length,
} from "class-validator";
import { Conversation, User } from "../index.js";

@Entity()
export class Message {
  @PrimaryGeneratedColumn()
  id: number;

  // Validate that MessageTimeStamp is a valid date and not empty
  @Column()
  @IsDate() // Ensures the field is a valid date
  @IsNotEmpty() // Ensures it's not empty
  MessageTimeStamp: Date;

  // Validate that content is a non-empty string and has a minimum length
  @Column()
  @IsString()
  @IsNotEmpty() // Ensures the field is not empty
  @Length(1, 500) // Content length should be between 1 and 500 characters
  content: string;

  // Validate that isRead is a boolean value
  @Column()
  @IsBoolean() // Ensures the field is a boolean
  isRead: boolean;

  // Define relations to Conversation and User
  @ManyToOne(
    () => Conversation,
    (conversation: Conversation) => conversation.messages
  )
  conversation: Relation<Conversation>;

  @ManyToOne(() => User)
  sender: Relation<User>;
}
