import { CreateDomainEventParams, DomainEvent } from '../../../Shared/Domain/Events/DomainEvent';
import { ApiKeyPrimitive } from '../Primitives/ApiKeyPrimitive';

type Attributes = ApiKeyPrimitive

type Params = CreateDomainEventParams & {
    attributes: Attributes;
};

export class ApiKeyDeleted extends DomainEvent {

    static readonly EVENT_NAME = 'docuco.auth.apiKey.deleted';

    readonly attributes: Attributes;

    constructor(params: Params) {
        const { entityId, eventId, occurredOn, attributes } = params;

        super({ eventName: ApiKeyDeleted.EVENT_NAME, entityId, eventId, occurredOn });
        this.attributes = attributes;
    }

}
