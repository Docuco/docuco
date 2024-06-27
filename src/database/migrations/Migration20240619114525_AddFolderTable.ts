import { Migration } from '@mikro-orm/migrations';

export class Migration20240619114525_AddFolderTable extends Migration {

  async up(): Promise<void> {
    this.addSql('create table "folders" ("id" varchar(255) not null, "name" varchar(255) not null, "is_deleted" boolean not null default false, "created_at" bigint not null, "updated_at" bigint not null, constraint "folders_pkey" primary key ("id"));');
  }

  async down(): Promise<void> {
    this.addSql('drop table if exists "folders" cascade;');
  }

}
