import { CreateNewApiKeyButton } from "./_components/CreateNewApiKeyButton/CreateNewApiKeyButton";
import { ListApiKeys } from "./_components/ListApiKeys/ListApiKeys";
import { getTokenPayload } from "../../../_utils/getTokenPayload";

export default function Page() {
  const tokenPayload = getTokenPayload();
  const canCreateApiKeys = tokenPayload.permissions.includes('api_key:create');

  return (
    <>
      {canCreateApiKeys && <CreateNewApiKeyButton />}

      <ListApiKeys />
    </>
  );
}
