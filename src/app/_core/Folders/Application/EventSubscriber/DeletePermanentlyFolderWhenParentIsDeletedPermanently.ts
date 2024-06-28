import { EventSubscriber } from "../../../Shared/Domain/Events/EventSubscriber";
import { BaseEventClass } from "../../../Shared/Domain/Events/BaseEvent";
import { FolderDeletedPermanently } from "../../Domain/Events/FolderDeletedPermanently";
import { FolderDeleterPermanentlyByParent } from "../../Domain/Services/FolderDeleterPermanentlyByParent";

export class DeletePermanentlyFolderWhenParentIsDeletedPermanently implements EventSubscriber {

    constructor(
        private readonly folderDeleterPermanentlyByParent: FolderDeleterPermanentlyByParent,
    ) { }

    get subscribedTo(): BaseEventClass[] {
        return [FolderDeletedPermanently];
    }

    async on(event: FolderDeletedPermanently): Promise<void> {
        const { attributes } = event;
        const folder = attributes;

        await this.folderDeleterPermanentlyByParent.run(folder);
    }
}