import { DeleteContentFileWhenDocuFileDeletedPermanently } from "../../../Documents/Application/EventSubscriber/DeleteContentFileWhenDocuFileDeletedPermanently";
import { DeleteDocuFileWhenParentIsDeleted } from "../../../Documents/Application/EventSubscriber/DeleteDocuFileWhenParentIsDeleted";
import { DeletePermanentlyDocuFileWhenParentIsDeletedPermanently } from "../../../Documents/Application/EventSubscriber/DeletePermanentlyDocuFileWhenParentIsDeletedPermanently";
import { RestoreDocuFileWhenParentIsRestored } from "../../../Documents/Application/EventSubscriber/RestoreDocuFileWhenParentIsRestored";
import { SaveDocuFileWhenContentFileUploaded } from "../../../Documents/Application/EventSubscriber/SaveDocuFileWhenContentFileUploaded";
import { ContentFileDeleter } from "../../../Documents/Domain/Services/ContentFileDeleter";
import { DocuFileDeleter } from "../../../Documents/Domain/Services/DocuFileDeleter";
import { DocuFileDeleterByParent } from "../../../Documents/Domain/Services/DocuFileDeleterByParent";
import { DocuFileDeleterPermanently } from "../../../Documents/Domain/Services/DocuFileDeleterPermanently";
import { DocuFileDeleterPermanentlyByParent } from "../../../Documents/Domain/Services/DocuFileDeleterPermanentlyByParent";
import { DocuFileRestorer } from "../../../Documents/Domain/Services/DocuFileRestorer";
import { DocuFileRestorerByParent } from "../../../Documents/Domain/Services/DocuFileRestorerByParent";
import { DocuFileSaver } from "../../../Documents/Domain/Services/DocuFileSaver";
import { DeleteFolderWhenParentIsDeleted } from "../../../Folders/Application/EventSubscriber/DeleteFolderWhenParentIsDeleted";
import { DeletePermanentlyFolderWhenParentIsDeletedPermanently } from "../../../Folders/Application/EventSubscriber/DeletePermanentlyFolderWhenParentIsDeletedPermanently";
import { RestoreFolderWhenParentIsRestored } from "../../../Folders/Application/EventSubscriber/RestoreFolderWhenParentIsRestored";
import { FolderDeleter } from "../../../Folders/Domain/Services/FolderDeleter";
import { FolderDeleterByParent } from "../../../Folders/Domain/Services/FolderDeleterByParent";
import { FolderDeleterPermanently } from "../../../Folders/Domain/Services/FolderDeleterPermanently";
import { FolderDeleterPermanentlyByParent } from "../../../Folders/Domain/Services/FolderDeleterPermanentlyByParent";
import { FolderFinder } from "../../../Folders/Domain/Services/FolderFinder";
import { FolderRestorer } from "../../../Folders/Domain/Services/FolderRestorer";
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
    
    const docuFileDeleter = new DocuFileDeleter(
        DIContainer.get('DocuFileRepository'),
        eventBus
    )
    const docuFileDeleterByParent = new DocuFileDeleterByParent(
        DIContainer.get('DocuFileRepository'),
        docuFileDeleter
    )

    const folderFinder = new FolderFinder(
        DIContainer.get('FolderRepository'),
    )

    const folderDeleter = new FolderDeleter(
        DIContainer.get('FolderRepository'),
        eventBus
    )

    const folderDeleterByParent = new FolderDeleterByParent(
        DIContainer.get('FolderRepository'),
        folderDeleter
    )

    const docuFileRestorer = new DocuFileRestorer(
        DIContainer.get('DocuFileRepository'),
        eventBus
    )

    const docuFileRestorerByParent = new DocuFileRestorerByParent(
        DIContainer.get('DocuFileRepository'),
        docuFileRestorer
    )

    const folderRestorer = new FolderRestorer(
        DIContainer.get('FolderRepository'),
        eventBus
    )

    const folderRestorerByParent = new FolderRestorerByParent(
        DIContainer.get('FolderRepository'),
        folderRestorer
    )

    const docuFileDeleterPermanently = new DocuFileDeleterPermanently(
        DIContainer.get('DocuFileRepository'),
        eventBus
    )

    const docuFileDeleterPermanentlyByParent = new DocuFileDeleterPermanentlyByParent(
        DIContainer.get('DocuFileRepository'),
        docuFileDeleterPermanently
    )

    const folderDeleterPermanently = new FolderDeleterPermanently(
        DIContainer.get('FolderRepository'),
        eventBus
    )

    const folderDeleterPermanentlyByParent = new FolderDeleterPermanentlyByParent(
        DIContainer.get('FolderRepository'),
        folderDeleterPermanently
    )

    eventBus.addSubscribers([
        new SaveDocuFileWhenContentFileUploaded(documentSaver),
        new DeleteContentFileWhenDocuFileDeletedPermanently(contentFileDeleter),
        new DeleteDocuFileWhenParentIsDeleted(folderFinder, docuFileDeleterByParent),
        new DeleteFolderWhenParentIsDeleted(folderFinder, folderDeleterByParent),
        new RestoreDocuFileWhenParentIsRestored(folderFinder, docuFileRestorerByParent),
        new RestoreFolderWhenParentIsRestored(folderFinder, folderRestorerByParent),
        new DeletePermanentlyDocuFileWhenParentIsDeletedPermanently(folderFinder, docuFileDeleterPermanentlyByParent),
        new DeletePermanentlyFolderWhenParentIsDeletedPermanently(folderFinder, folderDeleterPermanentlyByParent),
    ]);

    return eventBus;
}
