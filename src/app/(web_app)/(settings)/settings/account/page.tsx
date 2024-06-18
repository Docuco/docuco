'use client'

import { useGetUserAccount } from "./_hooks/useGetUserAccount";


export default function Page() {

  const {user, isLoading} = useGetUserAccount()

  if (isLoading || !user) {
    return null
  }

  return (
    <>
      {user.email}
    </>
  );
}
