import { AggregateRoot } from "../../../Shared/Domain/AggregateRoot";
import { Id } from "../../../Shared/Domain/VOs/Id";
import { UniqueVOCollection } from "../../../Shared/Domain/VOs/UniqueVoCollection";
import { UserCreated } from "../Events/UserCreated";
import { UserPermissionsChanged } from "../Events/UserPermissionsChanged";
import { UserPrimitive } from "../Primitives/UserPrimitive";
import { Email } from "../VOs/Email";
import { Permission, PermissionType } from "../../../Shared/Domain/VOs/Permission";
import { CreateUserDTO } from "../../Application/DTOs/CreateUserDTO";
import { UserDeleted } from "../Events/UserDeleted";

export class User extends AggregateRoot {

    constructor(
        private _id: Id,
        private _email: Email,
        private _permissions: UniqueVOCollection<Permission>,
        private _createdAt: Date,
        private _updatedAt: Date
    ) {
        super();
    }

    get id(): Id {
        return this._id;
    }

    get permissions(): UniqueVOCollection<Permission> {
        return this._permissions;
    }

    changePermissions(permissions: PermissionType[]) {
        const newPermissions = new UniqueVOCollection(permissions.map((permission) => new Permission(permission)));

        if (this._permissions.equals(newPermissions)) {
            return
        }

        this._permissions = newPermissions;
        this._updatedAt = new Date();
        this.record(new UserPermissionsChanged({
            entityId: this._id.value,
            attributes: this.toPrimitives(),
        }));
    }

    delete() {
        this.record(new UserDeleted({
            entityId: this._id.value,
            attributes: this.toPrimitives(),
        }));
    }

    static create({ email, permissions }: CreateUserDTO) {
        const primitive: UserPrimitive = {
            id: Id.new().value,
            email,
            permissions,
            createdAt: Date.now(),
            updatedAt: Date.now(),
        };

        const user = User.fromPrimitives(primitive);

        user.record(new UserCreated({
            entityId: user._id.value,
            attributes: user.toPrimitives(),
        }));

        return user;
    }

    static fromPrimitives(primitives: UserPrimitive) {
        return new User(
            new Id(primitives.id),
            new Email(primitives.email),
            new UniqueVOCollection(primitives.permissions.map((permission) => new Permission(permission))),
            new Date(primitives.createdAt),
            new Date(primitives.updatedAt),
        );
    }

    toPrimitives(): UserPrimitive {
        return {
            id: this._id.value,
            email: this._email.value,
            permissions: this._permissions.values.map((permission) => permission.value),
            createdAt: this._createdAt.getTime(),
            updatedAt: this._updatedAt.getTime(),
        };
    }
}