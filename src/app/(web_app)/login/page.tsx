import { AspectRatio, Center, Space } from "@mantine/core";
import { LoginForm } from "./_components/LoginForm";
import Image from "next/image";
import bgImage from "../../../../public/assets/login_background.jpg";

export default async function Page() {
    return (
      <>
        <Space h="xl" />
        <Space h="xl" />
        <Space h="xl" />
        <Space h="xl" />
        <Image
          src={bgImage}
          alt="Background with documents"
          placeholder="blur"
          fill
          style={{
            objectFit: 'cover',
            filter: 'blur(5px) brightness(0.7) saturate(0.7) hue-rotate(160deg)',
          }}
        />
        <Center>
          <LoginForm />
        </Center>
      </>
    )
  
}
