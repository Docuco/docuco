'use client'

import { Button, Card, Group, PasswordInput, Space, TextInput } from '@mantine/core';
import { useForm } from '@mantine/form';
import { clientCustomFetch } from '../../_utils/fetch';
import { useRouter } from 'next/navigation';
import { errorNotification } from '../../_utils/notifications';
import { useState } from 'react';
import { API_ROUTES } from '../../_utils/constants';

interface LoginType {
  email: string;
  password: string;
}

export function LoginForm() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

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
  
  async function doLogin(values: LoginType) {
    setIsLoading(true);
    try {
      await clientCustomFetch(API_ROUTES.AUTH_LOGIN, {
        method: 'POST',
        body: JSON.stringify(values),
      })
      router.push('/home');
    } catch {}
    setIsLoading(false);
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
          <Button type="submit" loading={isLoading}>Login</Button>
        </Group>
      </form>
    </Card>
  )
}
