import { CreateNewUserButton } from "./_components/CreateNewUserButton/CreateNewUserButton";
import { ListUsers } from "./_components/ListUsers/ListUsers";
import { getTokenPayload } from "../../../_utils/getTokenPayload";

export default function Page() {
  const tokenPayload = getTokenPayload();
  const canCreateUsers = tokenPayload.permissions.includes('users:create');
  
  return (
    <>
      {canCreateUsers && <CreateNewUserButton />}

      <ListUsers />
    </>
  );
}
