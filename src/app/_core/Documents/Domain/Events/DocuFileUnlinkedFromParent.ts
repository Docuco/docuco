import { CreateDomainEventParams, DomainEvent } from '../../../Shared/Domain/Events/DomainEvent';
import { DocuFilePrimitive } from '../Primitives/DocuFilePrimitive';

type Attributes = DocuFilePrimitive;

type Params = CreateDomainEventParams & {
    attributes: Attributes;
};

export class DocuFileUnlinkedFromParent extends DomainEvent {

    static readonly EVENT_NAME = 'docuco.documents.docuFile.unlinkFromParent';

    readonly attributes: Attributes;

    constructor(params: Params) {
        const { entityId, eventId, occurredOn, attributes } = params;

        super({ eventName: DocuFileUnlinkedFromParent.EVENT_NAME, entityId, eventId, occurredOn });
        this.attributes = attributes;
    }

}
