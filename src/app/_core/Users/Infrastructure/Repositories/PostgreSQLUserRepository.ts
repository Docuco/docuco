import { EntityManager, MikroORM } from "@mikro-orm/core";
import { UserRepository } from "../../Domain/Repositories/UserRepository";
import { User } from "../../Domain/Entities/User";
import { UserPrimitive } from "../../Domain/Primitives/UserPrimitive";
import { Email } from "../../Domain/VOs/Email";
import { Id } from "../../../Shared/Domain/VOs/Id";
import { Option } from "../../../Shared/Domain/VOs/Option";

export class PostgreSQLUserRepository implements UserRepository {

    constructor(private orm: MikroORM) {
    }

    private get em() {
        return this.orm.em.fork()
    }

    private getRepository(em: EntityManager) {
        const fork = em.getRepository<UserPrimitive>('Users');

        return fork;
    }

    async save(user: User): Promise<void> {
        this.getRepository(this.em).upsert(user.toPrimitives());
    }

    async findById(id: Id): Promise<Option<User>> {
        const result = await this.getRepository(this.em).findOne({ id: id.value });
        if (!result) {
            return Option.none();
        }

        return Option.some(User.fromPrimitives(result));
    }

    async findByEmail(email: Email): Promise<Option<User>> {
        const result = await this.getRepository(this.em).findOne({ email: email.value });
        if (!result) {
            return Option.none();
        }

        return Option.some(User.fromPrimitives(result));
    }

    async getAll(): Promise<User[]> {
        const result = await this.getRepository(this.em).findAll();
        
        return result.map(user => User.fromPrimitives(user));
    }

    async delete(user: User): Promise<void> {
        this.getRepository(this.em).nativeDelete({ id: user.id.value });
    }
}