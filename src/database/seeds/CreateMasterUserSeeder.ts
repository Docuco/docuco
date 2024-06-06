import type { EntityManager } from '@mikro-orm/core';
import { Seeder } from '@mikro-orm/seeder';
import { DIContainer } from '../../app/_core/Shared/Infrastructure/DIContainer';
import { CreateUser } from '../../app/_core/Users/Application/Commands/CreateUser';
import { ChangePermissions } from '../../app/_core/Users/Application/Commands/ChangePermissions';
import { Permission } from '../../app/_core/Shared/Domain/VOs/Permission';
import { UserFinder } from '../../app/_core/Users/Domain/Services/UserFinder';

export class CreateMasterUserSeeder extends Seeder {

  async run(em: EntityManager): Promise<void> {
    const email = process.env.MASTER_USER_EMAIL!;
    const password = process.env.MASTER_USER_PASSWORD!;

    await DIContainer.setup()
    
    const userRepository = DIContainer.get('UserRepository')
    const authRepository = DIContainer.get('AuthRepository')
    const eventBus = DIContainer.get('EventBus')
    const userFinder = new UserFinder(userRepository)
    

    const createUser = new CreateUser(
      userRepository,
      authRepository,
      eventBus
    )
    
    const userCreated = await createUser.run({ email, password })

    const changePermissions = new ChangePermissions(
      userFinder,
      userRepository,
      eventBus
    )

    await changePermissions.run({ userId: userCreated.id, permissions: Permission.ValidValues })
  }

}
