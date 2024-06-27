import { DeleteContentFileWhenDocuFileDeletedPermanently } from "../../../Documents/Application/EventSubscriber/DeleteContentFileWhenDocuFileDeletedPermanently";
import { DeleteDocuFileWhenParentIsDeleted } from "../../../Documents/Application/EventSubscriber/DeleteDocuFileWhenParentIsDeleted";
import { RestoreDocuFileWhenParentIsRestored } from "../../../Documents/Application/EventSubscriber/RestoreDocuFileWhenParentIsRestored";
import { SaveDocuFileWhenContentFileUploaded } from "../../../Documents/Application/EventSubscriber/SaveDocuFileWhenContentFileUploaded";
import { ContentFileDeleter } from "../../../Documents/Domain/Services/ContentFileDeleter";
import { DocuFileDeleterByParent } from "../../../Documents/Domain/Services/DocuFileDeleterByParent";
import { DocuFileRestorerByParent } from "../../../Documents/Domain/Services/DocuFileRestorerByParent";
import { DocuFileSaver } from "../../../Documents/Domain/Services/DocuFileSaver";
import { DeleteFolderWhenParentIsDeleted } from "../../../Folders/Application/EventSubscriber/DeleteFolderWhenParentIsDeleted";
import { RestoreFolderWhenParentIsRestored } from "../../../Folders/Application/EventSubscriber/RestoreFolderWhenParentIsRestored";
import { FolderDeleterByParent } from "../../../Folders/Domain/Services/FolderDeleterByParent";
import { FolderRestorerByParent } from "../../../Folders/Domain/Services/FolderRestorerByParent";
import { DIContainer } from "../DIContainer";
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

    const docuFileDeleterByParent = new DocuFileDeleterByParent(
        DIContainer.get('DocuFileRepository'),
        eventBus
    )

    const folderDeleterByParent = new FolderDeleterByParent(
        DIContainer.get('FolderRepository'),
        eventBus
    )

    const docuFileRestorerByParent = new DocuFileRestorerByParent(
        DIContainer.get('DocuFileRepository'),
        eventBus
    )

    const folderRestorerByParent = new FolderRestorerByParent(
        DIContainer.get('FolderRepository'),
        eventBus
    )

    eventBus.addSubscribers([
        new SaveDocuFileWhenContentFileUploaded(documentSaver),
        new DeleteContentFileWhenDocuFileDeletedPermanently(contentFileDeleter),
        new DeleteDocuFileWhenParentIsDeleted(docuFileDeleterByParent),
        new DeleteFolderWhenParentIsDeleted(folderDeleterByParent),
        new RestoreDocuFileWhenParentIsRestored(docuFileRestorerByParent),
        new RestoreFolderWhenParentIsRestored(folderRestorerByParent),
    ]);

    return eventBus;
}
