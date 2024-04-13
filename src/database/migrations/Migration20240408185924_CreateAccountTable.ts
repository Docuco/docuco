import { Migration } from '@mikro-orm/migrations';

export class Migration20240408185924_CreateAccountTable extends Migration {

  async up(): Promise<void> {
    this.addSql('create table `account` (`email` text not null, `password` text not null, `settings` json not null, `created_at` bigint not null, `updated_at` bigint not null, primary key (`email`));');
  }

}
