import { EventSubscriber } from "../../../Shared/Domain/Events/EventSubscriber";
import { BaseEventClass } from "../../../Shared/Domain/Events/BaseEvent";
import { FolderDeletedPermanently } from "../../Domain/Events/FolderDeletedPermanently";
import { FolderDeleterPermanentlyByParent } from "../../Domain/Services/FolderDeleterPermanentlyByParent";
import { FolderFinder } from "../../Domain/Services/FolderFinder";
import { Folder } from "../../Domain/Entities/Folder";

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

        const folder = Folder.fromPrimitives(folderPrimitive);
        await this.folderDeleterPermanentlyByParent.run(folder);
    }
}