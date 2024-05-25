import { showNotification, updateNotification } from '@mantine/notifications';
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
    const randomIdOperation = Id.generate().value;

    generalNotification({
        title: titleOnStart,
        message: messageOnStart,
        id: randomIdOperation,
    });

    try {
        await actionToNotify();
        updateNotification({
            id: randomIdOperation,
            loading: false,
            title: titleOnEnd,
            message: messageOnEnd,
            autoClose: 6000,
            disallowClose: false,
        });

    } catch (error) {
        updateNotification({
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

async function generalNotification({
    id = Id.generate().value,
    title,
    message = '',
}: {
    id?: string;
    title: string;
    message?: string;
}): Promise<void> {
    showNotification({
        id,
        loading: true,
        title,
        message,
        autoClose: false,
        disallowClose: true,
    });
}
