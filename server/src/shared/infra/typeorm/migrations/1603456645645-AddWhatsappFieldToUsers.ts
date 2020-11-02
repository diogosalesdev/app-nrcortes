import {MigrationInterface, QueryRunner, TableColumn} from "typeorm";

export class AddWhatsappFieldToUsers1603456645645 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.addColumn('users', new TableColumn({
        name: 'whatsapp',
        type: 'varchar',
        isNullable: true
      }))
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.dropColumn('users', 'whatsapp')
    }

}
