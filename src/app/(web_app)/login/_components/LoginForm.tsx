'use client'

import { Button, Card, Group, PasswordInput, Space, TextInput } from '@mantine/core';
import { useForm } from '@mantine/form';

interface LoginType {
  email: string;
  password: string;
}

export function LoginForm() {

  const form = useForm<LoginType>({
    mode: 'uncontrolled',
    initialValues: {
      email: '',
      password: '',
    },
    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
    },
  });
  
  function doLogin(values: LoginType) {
    console.log('doLogin', values);
  }

  return (
    <Card shadow="sm" padding="lg" radius="md" withBorder w='30%' maw='500px' miw='300px'>
      <form onSubmit={form.onSubmit((values) => doLogin(values))}>
        <TextInput
          withAsterisk
          label="Email"
          placeholder="your@email.com"
          key={form.key('email')}
          {...form.getInputProps('email')}
        />
        <Space h="xl" />
        <PasswordInput
          label="Password"
          placeholder="MyS3cr3tP@ssw0rd"
          key={form.key('password')}
          {...form.getInputProps('password')}
        />
        <Space h="xl" />
        <Group justify="flex-end" mt="md">
          <Button type="submit">Login</Button>
        </Group>
      </form>
    </Card>
  )
}
