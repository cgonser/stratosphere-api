import { MigrationInterface, QueryRunner } from "typeorm";

export class api1661128444256 implements MigrationInterface {
    name = 'api1661128444256'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE "user_auth_token" (
                "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
                "user_id" uuid,
                "token" character varying,
                "expires_at" TIMESTAMP NOT NULL,
                "used_at" TIMESTAMP,
                "created_at" TIMESTAMP NOT NULL DEFAULT now(),
                "updated_at" TIMESTAMP NOT NULL DEFAULT now(),
                CONSTRAINT "UQ_1c4e838c33c560c0e2f75bd65f6" UNIQUE ("token"),
                CONSTRAINT "PK_64d4188100cc6efae886afd8181" PRIMARY KEY ("id")
            )
        `);
        await queryRunner.query(`
            ALTER TABLE "user_account" DROP COLUMN "created_at"
        `);
        await queryRunner.query(`
            ALTER TABLE "user_account" DROP COLUMN "updated_at"
        `);
        await queryRunner.query(`
            ALTER TABLE "user_account"
            ADD "created_at" TIMESTAMP NOT NULL DEFAULT now()
        `);
        await queryRunner.query(`
            ALTER TABLE "user_account"
            ADD "updated_at" TIMESTAMP NOT NULL DEFAULT now()
        `);
        await queryRunner.query(`
            ALTER TABLE "user_auth_token"
            ADD CONSTRAINT "FK_e4dbc40e1c38f1497e0de9d1670" FOREIGN KEY ("user_id") REFERENCES "user_account"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "user_auth_token" DROP CONSTRAINT "FK_e4dbc40e1c38f1497e0de9d1670"
        `);
        await queryRunner.query(`
            ALTER TABLE "user_account" DROP COLUMN "updated_at"
        `);
        await queryRunner.query(`
            ALTER TABLE "user_account" DROP COLUMN "created_at"
        `);
        await queryRunner.query(`
            ALTER TABLE "user_account"
            ADD "updated_at" TIMESTAMP NOT NULL DEFAULT now()
        `);
        await queryRunner.query(`
            ALTER TABLE "user_account"
            ADD "created_at" TIMESTAMP NOT NULL DEFAULT now()
        `);
        await queryRunner.query(`
            DROP TABLE "user_auth_token"
        `);
    }

}
