import { CreateNewApiKeyButton } from "./_components/CreateNewApiKeyButton/CreateNewApiKeyButton";
import { ListApiKeys } from "./_components/ListApiKeys/ListApiKeys";

export default function Page() {

  return (
    <>
      <CreateNewApiKeyButton />

      <ListApiKeys />
    </>
  );
}
