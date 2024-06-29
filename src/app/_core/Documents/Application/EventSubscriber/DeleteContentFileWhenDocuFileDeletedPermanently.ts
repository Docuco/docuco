import { EventSubscriber } from "../../../Shared/Domain/Events/EventSubscriber";
import { BaseEventClass } from "../../../Shared/Domain/Events/BaseEvent";
import { DocuFileDeletedPermanently } from "../../Domain/Events/DocuFileDeletedPermanently";
import { ContentFileDeleter } from "../../Domain/Services/ContentFileDeleter";
import { DocuFile } from "../../Domain/Entities/DocuFile";

export class DeleteContentFileWhenDocuFileDeletedPermanently implements EventSubscriber {

    constructor(
        private readonly contentFileDeleter: ContentFileDeleter,
    ) { }

    get subscribedTo(): BaseEventClass[] {
        return [DocuFileDeletedPermanently];
    }

    async on(event: DocuFileDeletedPermanently): Promise<void> {
        const { attributes } = event;
        const docuFilePrimitive = attributes;

        const docuFile = DocuFile.fromPrimitives(docuFilePrimitive)
        await this.contentFileDeleter.run(docuFile);
    }
}