import { Center, Space, Text } from "@mantine/core";

export default function Page() {

  return (
    <>
      <Space h="xl" />
      <Space h="xl"/>
      <Center>
        <Text
          fw={500}
          size="3rem"
          variant="gradient"
          c="dimmed"
        >
          Welcome to Docuco!
        </Text>
      </Center>
      <Space h="xl" />
      <Center>
        <Text
          fw={500}
          size="1.5rem"
          c="dimmed"
        >
          we are glad to have you here, let&apos;s get started!
        </Text>
      </Center>
    </>
  );
}
