import { EventSubscriber } from "../../../Shared/Domain/Events/EventSubscriber";
import { BaseEventClass } from "../../../Shared/Domain/Events/BaseEvent";
import { FolderDeleted } from "../../../Folders/Domain/Events/FolderDeleted";
import { DocuFileDeleterByParent } from "../../Domain/Services/DocuFileDeleterByParent";
import { FolderFinder } from "../../../Folders/Domain/Services/FolderFinder";
import { Id } from "../../../Shared/Domain/VOs/Id";

export class DeleteDocuFileWhenParentIsDeleted implements EventSubscriber {

    constructor(
        private readonly folderFinder: FolderFinder,
        private readonly docuFileDeleterByParent: DocuFileDeleterByParent,
    ) { }

    get subscribedTo(): BaseEventClass[] {
        return [FolderDeleted];
    }

    async on(event: FolderDeleted): Promise<void> {
        const { attributes } = event;
        const folderPrimitive = attributes;

        const folder = await this.folderFinder.run(new Id(folderPrimitive.id));
        await this.docuFileDeleterByParent.run(folder);
    }
}