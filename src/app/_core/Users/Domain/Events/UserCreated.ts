import { CreateDomainEventParams, DomainEvent } from '../../../Shared/Domain/Events/DomainEvent';
import { UserPrimitive } from '../Primitives/UserPrimitive';

type Attributes = UserPrimitive

type Params = CreateDomainEventParams & {
    attributes: Attributes;
};

export class UserCreated extends DomainEvent {

    static readonly EVENT_NAME = 'docuco.users.user.created';

    readonly attributes: Attributes;

    constructor(params: Params) {
        const { entityId, eventId, occurredOn, attributes } = params;

        super({ eventName: UserCreated.EVENT_NAME, entityId, eventId, occurredOn });
        this.attributes = attributes;
    }

}
