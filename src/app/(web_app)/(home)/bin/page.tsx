import { Space } from "@mantine/core";
import { ListDeletedDocuFiles } from "./_components/ListDeletedDocuFiles/ListDeletedDocuFiles";
import { ListDeletedFolders } from "./_components/ListDeletedFolders/ListDeletedFolders";
import { BinBreadcrumbs } from "./folders/[folderId]/_components/BinBreadcrumbs/BinBreadcrumbs";

export default function Page() {

  return (
    <>
      <BinBreadcrumbs folderId={null} />
      <Space h="lg" />

      <ListDeletedFolders parentFolderId={null} />
      <ListDeletedDocuFiles parentFolderId={null} />
    </>
  );
}
