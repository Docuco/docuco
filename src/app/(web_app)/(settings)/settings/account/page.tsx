'use client'

import { useGetUser } from "./_hooks/useGetUser";


export default function Page() {

  const {user, isLoading} = useGetUser()

  if (isLoading || !user) {
    return null
  }

  return (
    <>
      Account Page
    </>
  );
}
