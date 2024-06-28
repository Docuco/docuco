import { EventSubscriber } from "../../../Shared/Domain/Events/EventSubscriber";
import { BaseEventClass } from "../../../Shared/Domain/Events/BaseEvent";
import { FolderDeleted } from "../../../Folders/Domain/Events/FolderDeleted";
import { DocuFileDeleterByParent } from "../../Domain/Services/DocuFileDeleterByParent";

export class DeleteDocuFileWhenParentIsDeleted implements EventSubscriber {

    constructor(
        private readonly docuFileDeleterByParent: DocuFileDeleterByParent,
    ) { }

    get subscribedTo(): BaseEventClass[] {
        return [FolderDeleted];
    }

    async on(event: FolderDeleted): Promise<void> {
        const { attributes } = event;
        const folder = attributes;

        await this.docuFileDeleterByParent.run(folder);
    }
}