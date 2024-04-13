import type { EntityManager } from '@mikro-orm/core';
import { Seeder } from '@mikro-orm/seeder';
import { DIContainer } from '../../app/_core/Shared/Infrastructure/DIContainer';
import { CreateAccount } from '../../app/_core/Accounts/Application/Commands/CreateAccount';

export class CreateMasterAccountSeeder extends Seeder {

  async run(em: EntityManager): Promise<void> {
    const email = process.env.EMAIL!;
    const password = process.env.PASSWORD!;

    await DIContainer.setup()
    
    const createAccount = new CreateAccount(
      DIContainer.get('AccountRepository'),
      DIContainer.get('EventBus')
    )
    
    await createAccount.run({ email, password })
  }

}
