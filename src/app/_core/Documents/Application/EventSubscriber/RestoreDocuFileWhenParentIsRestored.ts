import { EventSubscriber } from "../../../Shared/Domain/Events/EventSubscriber";
import { BaseEventClass } from "../../../Shared/Domain/Events/BaseEvent";
import { FolderRestored } from "../../../Folders/Domain/Events/FolderRestored";
import { DocuFileRestorerByParent } from "../../Domain/Services/DocuFileRestorerByParent";
import { FolderFinder } from "../../../Folders/Domain/Services/FolderFinder";
import { Id } from "../../../Shared/Domain/VOs/Id";

export class RestoreDocuFileWhenParentIsRestored implements EventSubscriber {

    constructor(
        private readonly folderFinder: FolderFinder,
        private readonly docuFileRestorerByParent: DocuFileRestorerByParent,
    ) { }

    get subscribedTo(): BaseEventClass[] {
        return [FolderRestored];
    }

    async on(event: FolderRestored): Promise<void> {
        const { attributes } = event;
        const folderPrimitive = attributes;

        const folder = await this.folderFinder.run(new Id(folderPrimitive.id));
        await this.docuFileRestorerByParent.run(folder);
    }
}