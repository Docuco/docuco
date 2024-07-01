import { notifications } from '@mantine/notifications';
import { Id } from '../../_core/Shared/Domain/VOs/Id';

export async function generalLoadingNotification({
    titleOnStart,
    titleOnEnd,
    titleOnError,
    messageOnStart = '',
    messageOnEnd = '',
    messageOnError = '',
    actionToNotify,
}: {
    titleOnStart: string;
    titleOnEnd: string;
    titleOnError: string;
    messageOnStart?: string;
    messageOnEnd?: string;
    messageOnError?: string;
    actionToNotify: () => Promise<void>;
}): Promise<void> {
    const randomIdOperation = Id.new().value;

    generalNotification({
        title: titleOnStart,
        message: messageOnStart,
        id: randomIdOperation,
        loading: true,
        autoClose: false,
    });

    try {
        await actionToNotify();
        notifications.update({
            id: randomIdOperation,
            loading: false,
            title: titleOnEnd,
            message: messageOnEnd,
            autoClose: 6000,
            disallowClose: false,
        });

    } catch (error) {
        notifications.update({
            id: randomIdOperation,
            loading: false,
            color: 'red',
            title: titleOnError,
            message: !!messageOnError ? messageOnError : (error as any)?.message ?? '',
            autoClose: false,
            disallowClose: false,
        });
    }

}

export async function generalNotification({
    id = Id.new().value,
    title,
    message = '',
    loading = false,
    color,
    autoClose = 6000,
}: {
    id?: string;
    title: string;
    message?: string;
    loading?: boolean;
    color?: 'blue' | 'red' | 'yellow' | 'green' | 'gray' | 'dark',
    autoClose?: number | boolean;
}): Promise<void> {
    notifications.show({
        id,
        loading,
        title,
        message,
        color,
        disallowClose: true,
        autoClose,
    });
}

export async function errorNotification({
    id = Id.new().value,
    title,
    message = '',
}: {
    id?: string;
    title: string;
    message?: string;
}): Promise<void> {
    notifications.show({
        id,
        color: 'red',
        title,
        message,
    })
}
