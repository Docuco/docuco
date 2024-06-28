import { CreateDomainEventParams, DomainEvent } from '../../../Shared/Domain/Events/DomainEvent';
import { ContentFilePrimitive } from '../Primitives/ContentFilePrimitive';

type Attributes = {
    contentFile: ContentFilePrimitive;
    url: string;
    folderParentId: string | null;
}

type Params = CreateDomainEventParams & {
    attributes: Attributes;
};

export class ContentFileUploaded extends DomainEvent {

    static readonly EVENT_NAME = 'docuco.documents.content.deleted';

    readonly attributes: Attributes;

    constructor(params: Params) {
        const { entityId, eventId, occurredOn, attributes } = params;

        super({ eventName: ContentFileUploaded.EVENT_NAME, entityId, eventId, occurredOn });
        this.attributes = attributes;
    }

}
