import { Center, Space } from "@mantine/core";
import { LoginForm } from "./_components/LoginForm";
import classes from "./page.module.css";
import { redirectIfAuthenticated } from "../_utils/redirectIfAuthenticated";

export default async function Page() {
  redirectIfAuthenticated();

  return (
    <div className={classes.main}>
      <Space h="xl" />
      <Space h="xl" />
      <Space h="xl" />
      <Space h="xl" />
      {/* <Image
        src={bgImage}
        alt="Background with documents"
        placeholder="blur"
        fill
        style={{
          objectFit: 'cover',
          filter: 'blur(5px) brightness(0.7) saturate(0.7) hue-rotate(160deg)',
        }}
      /> */}
      <Center>
        <LoginForm />
      </Center>
    </div>
  )
  
}
