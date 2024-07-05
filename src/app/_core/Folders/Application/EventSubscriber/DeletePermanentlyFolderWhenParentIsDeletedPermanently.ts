import { EventSubscriber } from "../../../Shared/Domain/Events/EventSubscriber";
import { BaseEventClass } from "../../../Shared/Domain/Events/BaseEvent";
import { FolderDeletedPermanently } from "../../Domain/Events/FolderDeletedPermanently";
import { FolderDeleterPermanentlyByParent } from "../../Domain/Services/FolderDeleterPermanentlyByParent";
import { FolderFinder } from "../../Domain/Services/FolderFinder";
import { Id } from "../../../Shared/Domain/VOs/Id";

export class DeletePermanentlyFolderWhenParentIsDeletedPermanently implements EventSubscriber {

    constructor(
        private readonly folderFinder: FolderFinder,
        private readonly folderDeleterPermanentlyByParent: FolderDeleterPermanentlyByParent,
    ) { }

    get subscribedTo(): BaseEventClass[] {
        return [FolderDeletedPermanently];
    }

    async on(event: FolderDeletedPermanently): Promise<void> {
        const { attributes } = event;
        const folderPrimitive = attributes;

        const folder = await this.folderFinder.run(new Id(folderPrimitive.id));
        await this.folderDeleterPermanentlyByParent.run(folder);
    }
}