import { EventSubscriber } from "../../../Shared/Domain/Events/EventSubscriber";
import { BaseEventClass } from "../../../Shared/Domain/Events/BaseEvent";
import { FolderRestorerByParent } from "../../Domain/Services/FolderRestorerByParent";
import { FolderRestored } from "../../Domain/Events/FolderRestored";
import { FolderFinder } from "../../Domain/Services/FolderFinder";
import { Id } from "../../../Shared/Domain/VOs/Id";

export class RestoreFolderWhenParentIsRestored implements EventSubscriber {

    constructor(
        private readonly folderFinder: FolderFinder,
        private readonly folderRestorerByParent: FolderRestorerByParent,
    ) { }

    get subscribedTo(): BaseEventClass[] {
        return [FolderRestored];
    }

    async on(event: FolderRestored): Promise<void> {
        const { attributes } = event;
        const folderPrimitive = attributes;

        const folder = await this.folderFinder.run(new Id(folderPrimitive.id));
        await this.folderRestorerByParent.run(folder);
    }
}