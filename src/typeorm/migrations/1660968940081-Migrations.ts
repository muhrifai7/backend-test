import {MigrationInterface, QueryRunner} from "typeorm";

export class Migrations1660968940081 implements MigrationInterface {
    name = 'Migrations1660968940081'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "product"
            ALTER COLUMN "description"
            SET NOT NULL
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "product"
            ALTER COLUMN "description" DROP NOT NULL
        `);
    }

}
