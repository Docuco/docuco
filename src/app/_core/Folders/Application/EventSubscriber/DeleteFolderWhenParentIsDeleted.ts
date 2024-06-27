import { EventSubscriber } from "../../../Shared/Domain/Events/EventSubscriber";
import { BaseEventClass } from "../../../Shared/Domain/Events/BaseEvent";
import { FolderDeleted } from "../../Domain/Events/FolderDeleted";
import { FolderDeleterByParent } from "../../Domain/Services/FolderDeleterByParent";

export class DeleteFolderWhenParentIsDeleted implements EventSubscriber {

    constructor(
        private readonly folderDeleterByParent: FolderDeleterByParent,
    ) { }

    get subscribedTo(): BaseEventClass[] {
        return [FolderDeleted];
    }

    async on(event: FolderDeleted): Promise<void> {
        const { attributes } = event;
        const folder = attributes;

        await this.folderDeleterByParent.run(folder);
    }
}