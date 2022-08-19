import { MigrationInterface, QueryRunner } from "typeorm";

export class Migrations1660904300825 implements MigrationInterface {
  name = "Migrations1660904300825";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            CREATE TABLE "product" (
                "id" SERIAL NOT NULL,
                "name" character varying NOT NULL,
                "color" character varying NOT NULL,
                "description" character varying NOT NULL,
                "file_name" character varying NOT NULL,
                CONSTRAINT "UQ_22cc43e9a74d7498546e9a63e77" UNIQUE ("name"),
                CONSTRAINT "REL_557112c9955555e7d08fa913f3" UNIQUE ("stock_id"),
                CONSTRAINT "PK_bebc9158e480b949565b4dc7a82" PRIMARY KEY ("id")
            )
        `);
    await queryRunner.query(`
            CREATE TABLE "stock" (
                "id" SERIAL NOT NULL,
                "name" character varying NOT NULL,
                "qty" character varying NOT NULL,
                "created_at" TIMESTAMP NOT NULL DEFAULT now(),
                "updated_at" TIMESTAMP NOT NULL DEFAULT now(),
                CONSTRAINT "UQ_70ed261bffa024f990043d26514" UNIQUE ("name"),
                CONSTRAINT "PK_092bc1fc7d860426a1dec5aa8e9" PRIMARY KEY ("id")
            )
        `);
    await queryRunner.query(`
            CREATE TABLE "tu_user" (
                "id" SERIAL NOT NULL,
                "email" character varying NOT NULL,
                "basic_salary" character varying,
                "password" character varying NOT NULL,
                "is_active" boolean NOT NULL DEFAULT true,
                "username" character varying,
                "created_at" TIMESTAMP NOT NULL DEFAULT now(),
                "updated_at" TIMESTAMP NOT NULL DEFAULT now(),
                CONSTRAINT "UQ_017e96eadd2266be841126a71ef" UNIQUE ("email"),
                CONSTRAINT "PK_2795790bcc590eab1cfd5f14f1c" PRIMARY KEY ("id")
            )
        `);
    await queryRunner.query(`
            ALTER TABLE "product"
            ADD CONSTRAINT "FK_557112c9955555e7d08fa913f3f" FOREIGN KEY ("stock_id") REFERENCES "stock"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            ALTER TABLE "product" DROP CONSTRAINT "FK_557112c9955555e7d08fa913f3f"
        `);
    await queryRunner.query(`
            DROP TABLE "tu_user"
        `);
    await queryRunner.query(`
            DROP TABLE "stock"
        `);
    await queryRunner.query(`
            DROP TABLE "product"
        `);
  }
}
