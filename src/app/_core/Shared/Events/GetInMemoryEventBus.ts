import { DeleteContentFileWhenDocuFileDeletedPermanently } from "../../Documents/Application/EventSubscriber/DeleteContentFileWhenDocuFileDeletedPermanently";
import { SaveDocuFileWhenContentFileUploaded } from "../../Documents/Application/EventSubscriber/SaveDocuFileWhenContentFileUploaded copy";
import { ContentFileDeleter } from "../../Documents/Domain/Services/ContentFileDeleter";
import { DocuFileSaver } from "../../Documents/Domain/Services/DocuFileSaver";
import { DIContainer } from "../Infrastructure/DIContainer";
import { InMemoryEventBus } from "./InMemoryEventBus";

export function GetInMemoryEventBus(): InMemoryEventBus {
    const eventBus = new InMemoryEventBus();

    const documentSaver = new DocuFileSaver(
        DIContainer.get('DocuFileRepository'),
        eventBus
    )
    
    const contentFileDeleter = new ContentFileDeleter(
        DIContainer.get('ContentFileStore'),
        eventBus
    )

    eventBus.addSubscribers([
        new SaveDocuFileWhenContentFileUploaded(documentSaver),
        new DeleteContentFileWhenDocuFileDeletedPermanently(contentFileDeleter)
    ]);

    return eventBus;
}
