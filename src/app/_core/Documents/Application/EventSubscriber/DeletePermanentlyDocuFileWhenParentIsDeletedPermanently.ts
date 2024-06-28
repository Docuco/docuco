import { EventSubscriber } from "../../../Shared/Domain/Events/EventSubscriber";
import { BaseEventClass } from "../../../Shared/Domain/Events/BaseEvent";
import { FolderDeletedPermanently } from "../../../Folders/Domain/Events/FolderDeletedPermanently";
import { DocuFileDeleterPermanentlyByParent } from "../../Domain/Services/DocuFileDeleterPermanentlyByParent";

export class DeletePermanentlyDocuFileWhenParentIsDeletedPermanently implements EventSubscriber {

    constructor(
        private readonly docuFileDeleterPermanentlyByParent: DocuFileDeleterPermanentlyByParent,
    ) { }

    get subscribedTo(): BaseEventClass[] {
        return [FolderDeletedPermanently];
    }

    async on(event: FolderDeletedPermanently): Promise<void> {
        const { attributes } = event;
        const folder = attributes;

        await this.docuFileDeleterPermanentlyByParent.run(folder);
    }
}