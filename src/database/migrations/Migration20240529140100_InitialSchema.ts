import { Migration } from '@mikro-orm/migrations';

export class Migration20240529140100_InitialSchema extends Migration {

  async up(): Promise<void> {
    this.addSql('create table "docu_files" ("id" varchar(255) not null, "name" varchar(255) not null, "mime_type" varchar(255) not null, "size_in_bytes" int not null, "extension" varchar(255) null, "url" varchar(255) not null, "is_deleted" boolean not null default false, "shared_token" varchar(255) null, "created_at" bigint not null, "updated_at" bigint not null, constraint "docu_files_pkey" primary key ("id"));');

    this.addSql('create table "users" ("id" varchar(255) not null, "email" varchar(255) not null, "created_at" bigint not null, "updated_at" bigint not null, constraint "users_pkey" primary key ("id"));');
  }

  async down(): Promise<void> {
    this.addSql('drop table if exists "docu_files" cascade;');

    this.addSql('drop table if exists "users" cascade;');
  }

}
