'use client'

import { useGetAccount } from "./_hooks/useGetAccount";

import { SaveDataSection } from "./_components/SaveDataSection/SaveDataSection";

export default function Page() {

  const {account, isLoading} = useGetAccount()

  if (isLoading || !account) {
    return null
  }

  return (
    <>
      <SaveDataSection account={account}/>
    </>
  );
}
