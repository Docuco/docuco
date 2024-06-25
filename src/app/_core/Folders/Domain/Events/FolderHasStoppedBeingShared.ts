import { CreateDomainEventParams, DomainEvent } from '../../../Shared/Domain/Events/DomainEvent';
import { FolderPrimitive } from '../Primitives/FolderPrimitive';

type Attributes = FolderPrimitive

type Params = CreateDomainEventParams & {
    attributes: Attributes;
};

export class FolderHasStoppedBeingShared extends DomainEvent {

    static readonly EVENT_NAME = 'docuco.fodlers.folder.hasStoppedBeingShared';

    readonly attributes: Attributes;

    constructor(params: Params) {
        const { entityId, eventId, occurredOn, attributes } = params;

        super({ eventName: FolderHasStoppedBeingShared.EVENT_NAME, entityId, eventId, occurredOn });
        this.attributes = attributes;
    }

}
