import { MigrationInterface, QueryRunner } from "typeorm";

export class api1660945168646 implements MigrationInterface {
    name = 'api1660945168646'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "user_account"
            ADD "created_at" TIMESTAMP NOT NULL DEFAULT now()
        `);
        await queryRunner.query(`
            ALTER TABLE "user_account"
            ADD "updated_at" TIMESTAMP NOT NULL DEFAULT now()
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "user_account" DROP COLUMN "updated_at"
        `);
        await queryRunner.query(`
            ALTER TABLE "user_account" DROP COLUMN "created_at"
        `);
    }

}
