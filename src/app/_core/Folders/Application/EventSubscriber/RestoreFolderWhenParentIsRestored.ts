import { EventSubscriber } from "../../../Shared/Domain/Events/EventSubscriber";
import { BaseEventClass } from "../../../Shared/Domain/Events/BaseEvent";
import { FolderRestorerByParent } from "../../Domain/Services/FolderRestorerByParent";
import { FolderRestored } from "../../Domain/Events/FolderRestored";

export class RestoreFolderWhenParentIsRestored implements EventSubscriber {

    constructor(
        private readonly folderRestorerByParent: FolderRestorerByParent,
    ) { }

    get subscribedTo(): BaseEventClass[] {
        return [FolderRestored];
    }

    async on(event: FolderRestored): Promise<void> {
        const { attributes } = event;
        const folder = attributes;

        await this.folderRestorerByParent.run(folder);
    }
}