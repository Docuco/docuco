import { Migration } from '@mikro-orm/migrations';

export class Migration20240408133636_CreateDocuFileTable extends Migration {

  async up(): Promise<void> {
    this.addSql('create table `docu_file` (`id` text not null, `name` text not null, `mime_type` text not null, `size_in_bytes` integer not null, `extension` text null, `url` text not null, `is_deleted` integer not null default false, `created_at` bigint not null, `updated_at` bigint not null, primary key (`id`));');
  }

}
