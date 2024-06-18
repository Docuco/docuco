import type { EntityManager } from '@mikro-orm/core';
import { Seeder } from '@mikro-orm/seeder';
import { DIContainer } from '../../app/_core/Shared/Infrastructure/DIContainer';
import { CreateUser } from '../../app/_core/Users/Application/Commands/CreateUser';
import { Permission } from '../../app/_core/Shared/Domain/VOs/Permission';

export class CreateMasterUserSeeder extends Seeder {

  async run(em: EntityManager): Promise<void> {
    const email = process.env.MASTER_USER_EMAIL!;
    const password = process.env.MASTER_USER_PASSWORD!;

    await DIContainer.setup()
    
    const userRepository = DIContainer.get('UserRepository')
    const authRepository = DIContainer.get('AuthRepository')
    const eventBus = DIContainer.get('EventBus')

    const createUser = new CreateUser(
      userRepository,
      authRepository,
      eventBus
    )
    
    await createUser.run({ email, password, permissions: Permission.ValidValues })

    await DIContainer.destroy()
  }

}
