import { redirectIfNotAuthenticated } from "../_utils/redirectIfNotAuthenticated";
import { HomeLayout } from "./homeLayout";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  redirectIfNotAuthenticated();

  return (
    <HomeLayout>
        {children}
    </HomeLayout>
  );
}
