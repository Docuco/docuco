'use client'

import { useGetAccount } from "./_hooks/useGetAccount";


export default function Page() {

  const {account, isLoading} = useGetAccount()

  if (isLoading || !account) {
    return null
  }

  return (
    <>
      Account Page
    </>
  );
}
