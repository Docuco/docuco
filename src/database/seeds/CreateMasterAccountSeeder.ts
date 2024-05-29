import type { EntityManager } from '@mikro-orm/core';
import { Seeder } from '@mikro-orm/seeder';
import { DIContainer } from '../../app/_core/Shared/Infrastructure/DIContainer';
import { CreateUser } from '../../app/_core/Users/Application/Commands/CreateUser';

export class CreateMasterUserSeeder extends Seeder {

  async run(em: EntityManager): Promise<void> {
    const email = process.env.MASTER_USER_EMAIL!;
    const password = process.env.MASTER_USER_PASSWORD!;

    await DIContainer.setup()
    
    const createUser = new CreateUser(
      DIContainer.get('UserRepository'),
      DIContainer.get('AuthRepository'),
      DIContainer.get('EventBus')
    )
    
    await createUser.run({ email, password })
  }

}
