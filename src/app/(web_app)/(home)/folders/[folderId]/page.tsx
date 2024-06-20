import { Group } from "@mantine/core";
import { getTokenPayload } from "../../../_utils/getTokenPayload";
import { AddNewDocumentButton } from "../_components/AddNewDocumentButton/AddNewDocumentButton";
import { AddNewFolderButton } from "../_components/AddNewFolderButton/AddNewFolderButton";
import { ListDocuFiles } from "../_components/ListDocuFiles/ListDocuFiles";
import { ListFolders } from "../_components/ListFolders/ListFolders";

export default function Page({
  params,
}: {
  params: { folderId: string }
}) {
  const tokenPayload = getTokenPayload();
  const canAddDocuments = tokenPayload.permissions.includes('documents:upload');

  return (
    <>
      <Group gap={10}>
        {canAddDocuments && <AddNewDocumentButton folderParentId={params.folderId} />}
        <AddNewFolderButton folderParentId={params.folderId}/>
      </Group>

      <ListFolders folderParentId={params.folderId} />
      <ListDocuFiles folderParentId={params.folderId} />
    </>
  );
}
