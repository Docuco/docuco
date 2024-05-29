import { Migration } from '@mikro-orm/migrations';

export class Migration20240527181929_AddSharedToken extends Migration {

  async up(): Promise<void> {
    this.addSql('alter table "docu_files" add column "shared_token" varchar(255) null;');
  }

  async down(): Promise<void> {
    this.addSql('alter table "docu_files" drop column "shared_token";');
  }

}
