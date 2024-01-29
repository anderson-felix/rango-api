import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateUserTable1635442317001 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'user',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'name',
            type: 'varchar',
          },
          {
            name: 'email',
            type: 'varchar',
            isUnique: true,
          },
          {
            name: 'password',
            type: 'varchar',
            default: `''`,
          },
          {
            name: 'phone',
            type: 'varchar',
            default: `''`,
          },
          {
            name: 'address',
            type: 'json',
            default: `'{}'`,
          },
          {
            name: 'sso_data',
            type: 'json',
            default: `'{}'`,
          },
          {
            name: 'recovery_token',
            type: 'json',
            default: `'{"token":null,"expires":null}'`,
          },
          {
            name: 'birthdate',
            type: 'timestamp',
            isNullable: true,
          },
          {
            name: 'disabled_at',
            type: 'timestamp',
            isNullable: true,
            default: null,
          },
          {
            name: 'deleted_at',
            type: 'timestamp',
            isNullable: true,
          },
          {
            name: 'created_at',
            type: 'timestamp',
            default: 'now()',
          },
          {
            name: 'updated_at',
            type: 'timestamp',
            default: 'now()',
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('user', true);
  }
}
