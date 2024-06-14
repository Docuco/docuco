import { AggregateRoot } from "../../../Shared/Domain/AggregateRoot";
import { Id } from "../../../Shared/Domain/VOs/Id";
import { Option } from "../../../Shared/Domain/VOs/Option";
import { Permission, PermissionType } from "../../../Shared/Domain/VOs/Permission";
import { UniqueVOCollection } from "../../../Shared/Domain/VOs/UniqueVoCollection";
import { CreateApiKeyDTO } from "../../Application/DTOs/CreateApiKeyDTO";
import { UpdateApiKeyDTO } from "../../Application/DTOs/UpdateApiKeyDTO";
import { ApiKeyCreated } from "../Events/ApiKeyCreated";
import { ApiKeyDeleted } from "../Events/ApiKeyDeleted";
import { ApiKeyPermissionsChanged } from "../Events/ApiKeyPermissionsChanged";
import { ApiKeyUpdated } from "../Events/ApiKeyUpdated";
import { ApiKeyPrimitive } from "../Primitives/ApiKeyPrimitive";
import { ApiKeyToken } from "../VOs/ApiKeyToken";
import { ApiKeyValue } from "../VOs/ApiKeyValue";

export class ApiKey extends AggregateRoot {

    constructor(
        private _creatorId: Id,
        private _name: string,
        private _description: Option<string>,
        private _apiKeyValue: ApiKeyValue,
        private _permissions: UniqueVOCollection<Permission>,
        private _createdAt: Date,
        private _updatedAt: Date
    ) {
        super();
    }

    get creatorId(): Id {
        return this._creatorId;
    }

    get name(): string {
        return this._name;
    }

    get description(): Option<string> {
        return this._description;
    }

    get apiKeyValue(): ApiKeyValue {
        return this._apiKeyValue;
    }

    get permissions(): UniqueVOCollection<Permission> {
        return this._permissions;
    }

    get createdAt(): Date {
        return this._createdAt;
    }

    get updatedAt(): Date {
        return this._updatedAt;
    }

    getAccessToken(): ApiKeyToken {
        return ApiKeyToken.generate(process.env.JWT_SECRET!, this);
    }

    static create(dto: CreateApiKeyDTO): ApiKey {
        const primitive: ApiKeyPrimitive = {
            creatorId: dto.creatorId,
            name: dto.name,
            description: dto.description,
            apiKeyValue: ApiKeyValue.generate().value,
            permissions: dto.permissions,
            createdAt: Date.now(),
            updatedAt: Date.now(),
        };

        const apiKey = ApiKey.fromPrimitives(primitive);

        apiKey.record(new ApiKeyCreated({
            entityId: apiKey._apiKeyValue.value,
            attributes: apiKey.toPrimitives(),
        }));

        return apiKey;
    }

    update(dto: UpdateApiKeyDTO) {
        let hasChanged = false;
        if (this._name !== dto.name) {
            this._name = dto.name;
            hasChanged = true;
        }

        if (this._description.check(desc => desc !== dto.description)) {
            this._description = Option.fromValue(dto.description);
            hasChanged = true;
        }

        if (hasChanged) {
            this._updatedAt = new Date();
            this.record(new ApiKeyUpdated({
                entityId: this._apiKeyValue.value,
                attributes: this.toPrimitives(),
            }));
        }
    }

    delete(): void {
        this.record(new ApiKeyDeleted({
            entityId: this._apiKeyValue.value,
            attributes: this.toPrimitives(),
        }));
    }

    changePermissions(permissions: PermissionType[]) {
        const newPermissions = new UniqueVOCollection(permissions.map((permission) => new Permission(permission)));

        if (this._permissions.equals(newPermissions)) {
            return
        }

        this._permissions = newPermissions;
        this._updatedAt = new Date();
        this.record(new ApiKeyPermissionsChanged({
            entityId: this._apiKeyValue.value,
            attributes: this.toPrimitives(),
        }));
    }

    static fromPrimitives(primitives: ApiKeyPrimitive) {
        return new ApiKey(
            new Id(primitives.creatorId),
            primitives.name,
            primitives.description ? Option.some(primitives.description) : Option.none(),
            new ApiKeyValue(primitives.apiKeyValue),
            new UniqueVOCollection(primitives.permissions.map((permission) => new Permission(permission))),
            new Date(primitives.createdAt),
            new Date(primitives.updatedAt),
        );
    }

    toPrimitives(): ApiKeyPrimitive {
        return {
            creatorId: this._creatorId.value,
            name: this._name,
            description: this._description.map((desc) => desc).getOrNull(),
            apiKeyValue: this._apiKeyValue.value,
            permissions: this._permissions.values.map((permission) => permission.value),
            createdAt: this._createdAt.getTime(),
            updatedAt: this._updatedAt.getTime(),
        };
    }
}