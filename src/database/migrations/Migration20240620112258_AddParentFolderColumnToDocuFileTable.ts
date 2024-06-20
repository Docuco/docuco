import { Migration } from '@mikro-orm/migrations';

export class Migration20240620112258_AddParentFolderColumnToDocuFileTable extends Migration {

  async up(): Promise<void> {
    this.addSql('alter table "docu_files" add column "folder_parent_id" varchar(255) null;');
  }

  async down(): Promise<void> {
    this.addSql('alter table "docu_files" drop column "folder_parent_id";');
  }

}
