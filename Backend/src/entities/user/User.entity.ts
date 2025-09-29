import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  TableInheritance,
} from "typeorm";
import {
  IsEmail,
  IsString,
  Length,
  Matches,
  IsDate,
  IsEnum,
  IsPhoneNumber,
  IsOptional,
} from "class-validator";
import { Gender, Role } from "../../graphql/types/resolvers-types.js";

@Entity()
@TableInheritance({ column: { type: "varchar", name: "type" } })
export class User {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  @IsString()
  @Length(2, 50, { message: "firstName must be between 2 and 50 characters." })
  firstName!: string;

  @Column()
  @IsString()
  @Length(2, 50, { message: "lastName must be between 2 and 50 characters." })
  lastName!: string;

  @Column()
  @IsEmail({}, { message: "Invalid email format." })
  email!: string;

  @Column()
  @IsString()
  @Length(8, 100, { message: "Password must be at least 8 characters long." })
  @Matches(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*#?&]{8,}$/, {
    message:
      "Password must contain at least one letter, one number, and be at least 8 characters long.",
  })
  password: string;

  @Column({ default: false })
  verified: boolean;

  @Column({ nullable: true })
  @IsString()
  @Length(2, 50, { message: "Country must be between 2 and 50 characters." })
  @IsOptional()
  country?: string;

  @Column({ nullable: true })
  @IsString()
  @Length(2, 50, { message: "City must be between 2 and 50 characters." })
  @IsOptional()
  city?: string;

  @Column({ nullable: true })
  @IsString()
  @Length(2, 100, { message: "Street must be between 2 and 100 characters." })
  @IsOptional()
  street?: string;

  @Column({ nullable: true })
  @IsString()
  @Length(1, 10, {
    message: "Postal code must be between 1 and 10 characters.",
  })
  @IsOptional()
  postalCode?: string;

  @Column({ nullable: true })
  @IsPhoneNumber(null, { message: "Invalid phone number." })
  @IsOptional()
  phoneNumber?: string;

  @Column({ nullable: true })
  @IsDate({ message: "BirthDay must be a valid date." })
  @IsOptional()
  birthDay?: string;

  @Column({ nullable: true })
  @IsEnum(Gender, {
    message: "Gender must be one of 'MALE', 'FEMALE'",
  })
  @IsOptional()
  gender?: Gender;

  @Column({ nullable: true })
  @IsOptional()
  profileImg?: string;

  @Column({ nullable: true })
  @IsOptional()
  coverImg?: string;

  @Column()
  @IsEnum(Role, {
    message: "Role must be one of 'ADMIN', 'BUYER', or 'SELLER'.",
  })
  @IsOptional()
  role!: Role;

  @Column({ default: false })
  @IsOptional()
  isBlocked?: boolean;

  @Column({ default: new Date() })
  @IsOptional()
  createdAt?: Date;

  @Column({ default: new Date() })
  @IsOptional()
  updatedAt?: Date;
}
