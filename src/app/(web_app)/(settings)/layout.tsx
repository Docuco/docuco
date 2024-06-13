import { redirectIfNotAuthenticated } from "../_utils/redirectIfNotAuthenticated";
import { SettingsLayout } from "./settingsLayout";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  redirectIfNotAuthenticated();

  return (
    <SettingsLayout>
        {children}
    </SettingsLayout>
  );
}
