import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { User } from "../user/User.entity.js";
import { IsOptional, Length, minLength } from "class-validator";
import { TokenType } from "../../graphql/types/resolvers-types.js";

@Entity()
export class VerificationToken {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(() => User, { onDelete: "CASCADE" })
  @JoinColumn()
  user: User;

  @Column()
  @Length(6, 255)
  token: string;

  @Column()
  @IsOptional()
  expiresAt: Date;

  @CreateDateColumn()
  createdAt: Date;

  @Column()
  type: TokenType;
}
