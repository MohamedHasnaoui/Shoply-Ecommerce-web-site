import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { IsString, IsDate } from "class-validator";

@Entity()
export class Payment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  @IsDate({ message: "Invalid date format." })
  paymentDate: Date;

  @Column()
  @IsString()
  paymentType: string;
}
