import { Space } from "@mantine/core";
import { BinBreadcrumbs } from "./_components/BinBreadcrumbs/BinBreadcrumbs";
import { ListDeletedFolders } from "../../_components/ListDeletedFolders/ListDeletedFolders";
import { ListDeletedDocuFiles } from "../../_components/ListDeletedDocuFiles/ListDeletedDocuFiles";

export default function Page({
  params,
}: {
  params: { folderId: string }
}) {

  return (
    <>
      <BinBreadcrumbs folderId={params.folderId} />
      <Space h="lg" />

      <ListDeletedFolders parentFolderId={params.folderId} />
      <ListDeletedDocuFiles parentFolderId={params.folderId} />
    </>
  );
}
