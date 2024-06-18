import { CreateDomainEventParams, DomainEvent } from '../../../Shared/Domain/Events/DomainEvent';
import { UserPrimitive } from '../Primitives/UserPrimitive';

type Attributes = UserPrimitive

type Params = CreateDomainEventParams & {
    attributes: Attributes;
};

export class UserDeleted extends DomainEvent {

    static readonly EVENT_NAME = 'docuco.users.user.deleted';

    readonly attributes: Attributes;

    constructor(params: Params) {
        const { entityId, eventId, occurredOn, attributes } = params;

        super({ eventName: UserDeleted.EVENT_NAME, entityId, eventId, occurredOn });
        this.attributes = attributes;
    }

}
