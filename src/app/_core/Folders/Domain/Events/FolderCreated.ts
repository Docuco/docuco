import { CreateDomainEventParams, DomainEvent } from '../../../Shared/Domain/Events/DomainEvent';
import { FolderPrimitive } from '../Primitives/FolderPrimitive';

type Attributes = FolderPrimitive

type Params = CreateDomainEventParams & {
    attributes: Attributes;
};

export class FolderCreated extends DomainEvent {

    static readonly EVENT_NAME = 'docuco.folders.folder.created';

    readonly attributes: Attributes;

    constructor(params: Params) {
        const { entityId, eventId, occurredOn, attributes } = params;

        super({ eventName: FolderCreated.EVENT_NAME, entityId, eventId, occurredOn });
        this.attributes = attributes;
    }

}
