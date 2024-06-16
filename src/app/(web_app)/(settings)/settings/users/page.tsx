'use client'

import { CreateNewUserButton } from "./_components/CreateNewUserButton/CreateNewUserButton";
import { ListUsers } from "./_components/ListUsers/ListUsers";

export default function Page() {

  return (
    <>
      <CreateNewUserButton />

      <ListUsers />
    </>
  );
}
