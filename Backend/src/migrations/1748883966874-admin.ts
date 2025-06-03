import { MigrationInterface, QueryRunner } from "typeorm";
import bcrypt from "bcrypt";
import { Role } from "../graphql/types/resolvers-types.js";
export class Admin1748883966874 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const pwd = await bcrypt.hash("admin1234", 10);
    await queryRunner.query(`INSERT INTO "user" 
            ("email", "password", "firstName", "lastName", "verified", "role","type")
             VALUES ('admin@shoply.com','${pwd}','Mohamed','El Hasnaoui',true,'${Role.Admin}','User')`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
