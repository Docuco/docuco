import { Migration } from '@mikro-orm/migrations';

export class Migration20240524205610_InitSchema extends Migration {

  async up(): Promise<void> {
    this.addSql('create table "accounts" ("id" varchar(255) not null, "email" varchar(255) not null, "created_at" bigint not null, "updated_at" bigint not null, constraint "accounts_pkey" primary key ("id"));');

    this.addSql('create table "docu_files" ("id" varchar(255) not null, "name" varchar(255) not null, "mime_type" varchar(255) not null, "size_in_bytes" int not null, "extension" varchar(255) null, "url" varchar(255) not null, "is_deleted" boolean not null default false, "created_at" bigint not null, "updated_at" bigint not null, constraint "docu_files_pkey" primary key ("id"));');

    this.addSql('drop table if exists "account" cascade;');

    this.addSql('drop table if exists "docu_file" cascade;');
  }

  async down(): Promise<void> {
    this.addSql('create table "account" ("id" varchar(255) not null, "email" varchar(255) not null, "created_at" int8 not null, "updated_at" int8 not null, constraint "account_pkey" primary key ("id"));');

    this.addSql('create table "docu_file" ("id" varchar(255) not null, "name" varchar(255) not null, "mime_type" varchar(255) not null, "size_in_bytes" int4 not null, "extension" varchar(255) null, "url" varchar(255) not null, "is_deleted" bool not null default false, "created_at" int8 not null, "updated_at" int8 not null, constraint "docu_file_pkey" primary key ("id"));');

    this.addSql('drop table if exists "accounts" cascade;');

    this.addSql('drop table if exists "docu_files" cascade;');
  }

}
