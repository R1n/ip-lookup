import { MigrationInterface, QueryRunner } from 'typeorm';

export class Ip1696540964070 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE ip_info (
                                      id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
                                      ip_address VARCHAR(255) UNIQUE NOT NULL,
                                      info JSON NOT NULL,
                                      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
             );`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE IF EXISTS ip_info;`);
  }
}
