import { Group } from "@mantine/core";
import { getTokenPayload } from "../../_utils/getTokenPayload";
import { AddNewDocumentButton } from "./_components/AddNewDocumentButton/AddNewDocumentButton";
import { AddNewFolderButton } from "./_components/AddNewFolderButton/AddNewFolderButton";
import { ListDocuFiles } from "./_components/ListDocuFiles/ListDocuFiles";
import { ListFolders } from "./_components/ListFolders/ListFolders";
import { Breadcrumbs } from "./[folderId]/_components/Breadcrumbs/Breadcrumbs";

export default function Page() {
  const tokenPayload = getTokenPayload();
  const canAddDocuments = tokenPayload.permissions.includes('documents:upload');

  return (
    <>
      <Breadcrumbs folderId={null} />
      <Group gap={10}>
        {canAddDocuments && <AddNewDocumentButton folderParentId={null} />}
        <AddNewFolderButton folderParentId={null} />
      </Group>

      <ListFolders folderParentId={null} />
      <ListDocuFiles folderParentId={null} />
    </>
  );
}
