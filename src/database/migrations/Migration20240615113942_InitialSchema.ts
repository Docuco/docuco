import { Migration } from '@mikro-orm/migrations';

export class Migration20240615113942_InitialSchema extends Migration {

  async up(): Promise<void> {
    this.addSql('create table "api_keys" ("id" varchar(255) not null, "creator_id" varchar(255) not null, "name" varchar(255) not null, "description" text null, "api_key_value" varchar(255) not null, "permissions" text[] not null, "created_at" bigint not null, "updated_at" bigint not null, constraint "api_keys_pkey" primary key ("id"));');
    this.addSql('alter table "api_keys" add constraint "api_keys_api_key_value_unique" unique ("api_key_value");');

    this.addSql('create table "auths" ("id" varchar(255) not null, "user_id" varchar(255) not null, "password" varchar(255) null, "created_at" bigint not null, "updated_at" bigint not null, constraint "auths_pkey" primary key ("id"));');

    this.addSql('create table "docu_files" ("id" varchar(255) not null, "name" varchar(255) not null, "mime_type" varchar(255) not null, "size_in_bytes" int not null, "extension" varchar(255) null, "url" varchar(255) not null, "is_deleted" boolean not null default false, "shared_token" varchar(255) null, "created_at" bigint not null, "updated_at" bigint not null, constraint "docu_files_pkey" primary key ("id"));');

    this.addSql('create table "users" ("id" varchar(255) not null, "email" varchar(255) not null, "permissions" text[] not null, "created_at" bigint not null, "updated_at" bigint not null, constraint "users_pkey" primary key ("id"));');
  }

  async down(): Promise<void> {
    this.addSql('drop table if exists "api_keys" cascade;');

    this.addSql('drop table if exists "auths" cascade;');

    this.addSql('drop table if exists "docu_files" cascade;');

    this.addSql('drop table if exists "users" cascade;');
  }

}
