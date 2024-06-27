import type { Metadata } from "next";
import { Raleway } from "next/font/google";
import { ColorSchemeScript, DEFAULT_THEME, MantineProvider, createTheme } from '@mantine/core';
import { ModalsProvider } from '@mantine/modals';

import '@mantine/core/styles.css';
import '@mantine/dropzone/styles.css';
import '@mantine/notifications/styles.css';
import "./globals.css";
import { Notifications } from "@mantine/notifications";

const mainFont = Raleway({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Docuco - Your document manager",
  description: "The document manager for your needs, save your documents in the cloud and access them from anywhere.",
};

const theme = createTheme({
  primaryColor: 'blue',
  fontFamily: mainFont.style.fontFamily,
  cursorType: 'pointer',
  headings: {
    fontFamily: `${mainFont.style.fontFamily}, ${DEFAULT_THEME.fontFamily}`,
  },
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/assets/logo.svg"/>
        <ColorSchemeScript defaultColorScheme="light"/>
      </head>
      <body className={mainFont.className}>
        <MantineProvider defaultColorScheme="light" theme={theme}>
          <ModalsProvider>
            {children}
            <Notifications limit={5}/>
          </ModalsProvider>
        </MantineProvider>
      </body>
    </html>
  );
}
