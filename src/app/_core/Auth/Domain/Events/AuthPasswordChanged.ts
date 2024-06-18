import { CreateDomainEventParams, DomainEvent } from '../../../Shared/Domain/Events/DomainEvent';
import { AuthPrimitive } from '../Primitives/AuthPrimitive';

type Attributes = AuthPrimitive

type Params = CreateDomainEventParams & {
    attributes: Attributes;
};

export class AuthPasswordChanged extends DomainEvent {

    static readonly EVENT_NAME = 'docuco.auth.password.changed';

    readonly attributes: Attributes;

    constructor(params: Params) {
        const { entityId, eventId, occurredOn, attributes } = params;

        super({ eventName: AuthPasswordChanged.EVENT_NAME, entityId, eventId, occurredOn });
        this.attributes = attributes;
    }

}
