import { Group, Space } from "@mantine/core";
import { getTokenPayload } from "../../../_utils/getTokenPayload";
import { AddNewDocumentButton } from "../_components/AddNewDocumentButton/AddNewDocumentButton";
import { AddNewFolderButton } from "../_components/AddNewFolderButton/AddNewFolderButton";
import { ListDocuFiles } from "../_components/ListDocuFiles/ListDocuFiles";
import { ListFolders } from "../_components/ListFolders/ListFolders";
import { Breadcrumbs } from "./_components/Breadcrumbs/Breadcrumbs";

export default function Page({
  params,
}: {
  params: { folderId: string }
}) {
  const tokenPayload = getTokenPayload();
  const canAddDocuments = tokenPayload.permissions.includes('documents:upload');

  return (
    <>
      <Breadcrumbs folderId={params.folderId} />
      <Space h="lg" />
      <Group gap={10}>
        {canAddDocuments && <AddNewDocumentButton parentFolderId={params.folderId} />}
        <AddNewFolderButton parentFolderId={params.folderId}/>
      </Group>

      <ListFolders parentFolderId={params.folderId} />
      <ListDocuFiles parentFolderId={params.folderId} />
    </>
  );
}
