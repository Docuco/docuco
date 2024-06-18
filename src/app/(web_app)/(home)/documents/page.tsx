import { getTokenPayload } from "../../_utils/getTokenPayload";
import { AddNewDocumentButton } from "./_components/AddNewDocumentButton/AddNewDocumentButton";
import { ListDocuFiles } from "./_components/ListDocuFiles/ListDocuFiles";

export default function Page() {
  const tokenPayload = getTokenPayload();
  const canAddDocuments = tokenPayload.permissions.includes('documents:upload');

  return (
    <>
      {canAddDocuments && <AddNewDocumentButton />}

      <ListDocuFiles/>
    </>
  );
}
