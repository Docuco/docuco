import { CreateDomainEventParams, DomainEvent } from '../../../Shared/Domain/Events/DomainEvent';
import { UserPrimitive } from '../Primitives/UserPrimitive';

type Attributes = UserPrimitive

type Params = CreateDomainEventParams & {
    attributes: Attributes;
};

export class UserPermissionsChanged extends DomainEvent {

    static readonly EVENT_NAME = 'docuco.users.permission.changed';

    readonly attributes: Attributes;

    constructor(params: Params) {
        const { entityId, eventId, occurredOn, attributes } = params;

        super({ eventName: UserPermissionsChanged.EVENT_NAME, entityId, eventId, occurredOn });
        this.attributes = attributes;
    }

}
