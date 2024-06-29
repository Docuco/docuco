import { EventSubscriber } from "../../../Shared/Domain/Events/EventSubscriber";
import { BaseEventClass } from "../../../Shared/Domain/Events/BaseEvent";
import { FolderDeleted } from "../../Domain/Events/FolderDeleted";
import { FolderDeleterByParent } from "../../Domain/Services/FolderDeleterByParent";
import { FolderFinder } from "../../Domain/Services/FolderFinder";
import { Id } from "../../../Shared/Domain/VOs/Id";

export class DeleteFolderWhenParentIsDeleted implements EventSubscriber {

    constructor(
        private readonly folderFinder: FolderFinder,
        private readonly folderDeleterByParent: FolderDeleterByParent,
    ) { }

    get subscribedTo(): BaseEventClass[] {
        return [FolderDeleted];
    }

    async on(event: FolderDeleted): Promise<void> {
        const { attributes } = event;
        const folderPrimitive = attributes;

        const folder = await this.folderFinder.run(new Id(folderPrimitive.id));
        await this.folderDeleterByParent.run(folder);
    }
}