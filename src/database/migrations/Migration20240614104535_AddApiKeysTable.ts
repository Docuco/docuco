import { Migration } from '@mikro-orm/migrations';

export class Migration20240614104535_AddApiKeysTable extends Migration {

  async up(): Promise<void> {
    this.addSql('create table "api_keys" ("creator_id" varchar(255) not null, "name" varchar(255) not null, "description" text null, "api_key_value" varchar(255) not null, "permissions" text[] not null, "created_at" bigint not null, "updated_at" bigint not null, constraint "api_keys_pkey" primary key ("api_key_value"));');
  }

  async down(): Promise<void> {
    this.addSql('drop table if exists "api_keys" cascade;');
  }

}
