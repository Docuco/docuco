import { EventSubscriber } from "../../../Shared/Domain/Events/EventSubscriber";
import { BaseEventClass } from "../../../Shared/Domain/Events/BaseEvent";
import { DocuFileDeletedPermanently } from "../../Domain/Events/DocuFileDeletedPermanently";
import { ContentFileDeleter } from "../../Domain/Services/ContentFileDeleter";

export class DeleteContentFileWhenDocuFileDeletedPermanently implements EventSubscriber {

    constructor(
        private readonly contentFileDeleter: ContentFileDeleter,
    ) { }

    get subscribedTo(): BaseEventClass[] {
        return [DocuFileDeletedPermanently];
    }

    async on(event: DocuFileDeletedPermanently): Promise<void> {
        const { attributes } = event;
        const docuFile = attributes;

        await this.contentFileDeleter.run(docuFile);
    }
}