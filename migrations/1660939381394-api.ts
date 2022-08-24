import { MigrationInterface, QueryRunner } from "typeorm";

export class api1660939381394 implements MigrationInterface {
    name = 'api1660939381394'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE "user_account" (
                "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
                "name" character varying,
                "email" character varying,
                "walletAddress" character varying,
                CONSTRAINT "UQ_952731f30103619eab0090bf2d8" UNIQUE ("walletAddress"),
                CONSTRAINT "PK_6acfec7285fdf9f463462de3e9f" PRIMARY KEY ("id")
            )
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            DROP TABLE "user_account"
        `);
    }
}
