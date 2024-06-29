import { Migration } from '@mikro-orm/migrations';

export class Migration20240619175507_AddParentFolderColumnToFolderTable extends Migration {

  async up(): Promise<void> {
    this.addSql('alter table "folders" add column "parent_folder_id" varchar(255) null;');
  }

  async down(): Promise<void> {
    this.addSql('alter table "folders" drop column "parent_folder_id";');
  }

}
