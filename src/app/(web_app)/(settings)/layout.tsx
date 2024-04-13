'use client'

import { AppShell, AppShellHeader, AppShellMain, AppShellNavbar } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { usePathname } from 'next/navigation';
import { Header } from "./_components/Header/Header";
import { Navbar } from "./_components/Navbar/Navbar";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [opened, { toggle }] = useDisclosure();
  const pathname = usePathname();

  return (
    <AppShell
      header={{ height: 70 }}
      navbar={{
        width: 300,
        breakpoint: 'sm',
        collapsed: { mobile: !opened },
      }}
      padding="md"
    >
      <AppShellHeader p="md">
        <Header
          opened={opened}
          onClickBurger={toggle}
        />
      </AppShellHeader>

      <AppShellNavbar p="md">
        <Navbar path={pathname} onNavigate={toggle}/>
      </AppShellNavbar>

      <AppShellMain>
        {children}
      </AppShellMain>
    </AppShell>
  );
}
