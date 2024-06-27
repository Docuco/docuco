import { EventSubscriber } from "../../../Shared/Domain/Events/EventSubscriber";
import { BaseEventClass } from "../../../Shared/Domain/Events/BaseEvent";
import { FolderRestored } from "../../../Folders/Domain/Events/FolderRestored";
import { DocuFileRestorerByParent } from "../../Domain/Services/DocuFileRestorerByParent";

export class RestoreDocuFileWhenParentIsRestored implements EventSubscriber {

    constructor(
        private readonly docuFileRestorerByParent: DocuFileRestorerByParent,
    ) { }

    get subscribedTo(): BaseEventClass[] {
        return [FolderRestored];
    }

    async on(event: FolderRestored): Promise<void> {
        const { attributes } = event;
        const folder = attributes;

        await this.docuFileRestorerByParent.run(folder);
    }
}