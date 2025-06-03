import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";
import { IsString, IsDate, IsEnum, IsOptional } from "class-validator";
import { PaymentType } from "../../graphql/types/resolvers-types.js";
@Entity()
export class Payment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  @IsDate({ message: "Invalid date format." })
  paymentDate: Date;

  @Column({ default: new Date() })
  @IsOptional()
  createdAt: Date;

  @Column()
  @IsString()
  @IsEnum(PaymentType, { message: "Type of Payment must be Visa or by PayPal" })
  paymentType: PaymentType;
}
