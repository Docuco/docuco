import { Migration } from '@mikro-orm/migrations';

export class Migration20240530181153_AddPermissionsToUsers extends Migration {

  async up(): Promise<void> {
    this.addSql('alter table "users" add column "permissions" text[] not null;');
  }

  async down(): Promise<void> {
    this.addSql('alter table "users" drop column "permissions";');
  }

}
