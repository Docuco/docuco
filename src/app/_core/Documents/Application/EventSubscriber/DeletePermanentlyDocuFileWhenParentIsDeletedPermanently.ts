import { EventSubscriber } from "../../../Shared/Domain/Events/EventSubscriber";
import { BaseEventClass } from "../../../Shared/Domain/Events/BaseEvent";
import { FolderDeletedPermanently } from "../../../Folders/Domain/Events/FolderDeletedPermanently";
import { DocuFileDeleterPermanentlyByParent } from "../../Domain/Services/DocuFileDeleterPermanentlyByParent";
import { FolderFinder } from "../../../Folders/Domain/Services/FolderFinder";
import { Folder } from "../../../Folders/Domain/Entities/Folder";

export class DeletePermanentlyDocuFileWhenParentIsDeletedPermanently implements EventSubscriber {

    constructor(
        private readonly folderFinder: FolderFinder,
        private readonly docuFileDeleterPermanentlyByParent: DocuFileDeleterPermanentlyByParent,
    ) { }

    get subscribedTo(): BaseEventClass[] {
        return [FolderDeletedPermanently];
    }

    async on(event: FolderDeletedPermanently): Promise<void> {
        const { attributes } = event;
        const folderPrimitive = attributes;

        const folder = Folder.fromPrimitives(folderPrimitive);
        await this.docuFileDeleterPermanentlyByParent.run(folder);
    }
}