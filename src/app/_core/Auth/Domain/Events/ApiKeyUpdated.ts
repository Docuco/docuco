import { CreateDomainEventParams, DomainEvent } from '../../../Shared/Domain/Events/DomainEvent';
import { ApiKeyPrimitive } from '../Primitives/ApiKeyPrimitive';

type Attributes = ApiKeyPrimitive

type Params = CreateDomainEventParams & {
    attributes: Attributes;
};

export class ApiKeyUpdated extends DomainEvent {

    static readonly EVENT_NAME = 'docuco.auth.apiKey.udpated';

    readonly attributes: Attributes;

    constructor(params: Params) {
        const { entityId, eventId, occurredOn, attributes } = params;

        super({ eventName: ApiKeyUpdated.EVENT_NAME, entityId, eventId, occurredOn });
        this.attributes = attributes;
    }

}
