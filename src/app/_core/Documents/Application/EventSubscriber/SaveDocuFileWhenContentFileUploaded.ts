import { DocuFileSaver } from "../../Domain/Services/DocuFileSaver";
import { ContentFileUploaded } from "../../Domain/Events/ContentFileUploaded";
import { EventSubscriber } from "../../../Shared/Domain/Events/EventSubscriber";
import { BaseEventClass } from "../../../Shared/Domain/Events/BaseEvent";

export class SaveDocuFileWhenContentFileUploaded implements EventSubscriber {

    constructor(
        private readonly docuFileSaver: DocuFileSaver,
    ) { }

    get subscribedTo(): BaseEventClass[] {
        return [ContentFileUploaded];
    }

    async on(event: ContentFileUploaded): Promise<void> {
        const { attributes } = event;
        const { contentFile, url, parentFolderId } = attributes;

        await this.docuFileSaver.run({ contentFile, url, parentFolderId });
    }
}