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
} from "class-validator";
import { Gender, Role } from "../../graphql/types/resolvers-types.js";

@Entity()
@TableInheritance({ column: { type: "varchar", name: "type" } })
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @IsString()
  @Length(2, 50, { message: "firstName must be between 2 and 50 characters." })
  firstName: string;

  @Column()
  @IsString()
  @Length(2, 50, { message: "lastName must be between 2 and 50 characters." })
  lastName: string;

  @Column()
  @IsEmail({}, { message: "Invalid email format." })
  email: string;

  @Column()
  @IsString()
  @Length(5, 100, { message: "Address must be between 5 and 100 characters." })
  address: string;

  @Column()
  @IsPhoneNumber(null, { message: "Invalid phone number." })
  phoneNumber: string;

  @Column()
  @IsString()
  @Length(8, 100, { message: "Password must be at least 8 characters long." })
  @Matches(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*#?&]{8,}$/, {
    message:
      "Password must contain at least one letter, one number, and be at least 8 characters long.",
  })
  password: string;

  @Column({ type: "date" })
  @IsDate({ message: "BirthDay must be a valid date." })
  birthDay: Date;

  @Column()
  @IsEnum(Gender, {
    message: "Gender must be one of 'MALE', 'FEMALE', or 'OTHER'.",
  })
  gender: Gender;

  @Column()
  @IsEnum(Role, {
    message: "Role must be one of 'ADMIN', 'BUYER', or 'SELLER'.",
  })
  role: Role;
}
