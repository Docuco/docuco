import { Migration } from '@mikro-orm/migrations';

export class Migration20240619175507_AddParentFolderColumnToFolderTable extends Migration {

  async up(): Promise<void> {
    this.addSql('alter table "folders" add column "folder_parent_id" varchar(255) null;');
  }

  async down(): Promise<void> {
    this.addSql('alter table "folders" drop column "folder_parent_id";');
  }

}
