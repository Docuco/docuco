import { ErrorCode } from "../../_core/Shared/Domain/Exceptions/ErrorCode";
import { errorNotification } from "./notifications";

export async function fetcher<JSON = any>(
    input: RequestInfo,
    init?: RequestInit
): Promise<JSON> {
    const res = await clientCustomFetch(input, init)
    return res.json()
}

export async function clientCustomFetch(input: RequestInfo, init?: RequestInit): Promise<Response> {
    
    const options: RequestInit = {
        ...init,
        headers: {
            ...init?.headers,
        }
    }
    const res = await fetch(input, options)
    if (!res.ok) {
        const body = await res.json();
        const { code, message } = body;

        errorNotification(mapErrorText(code));

        throw new Error(`${code}: ${message}`);
    }

    return res
}

function mapErrorText(errorCode: ErrorCode): { title: string; message?: string } {
    const map: { [key in ErrorCode]: { title: string; message?: string } } = {
        [ErrorCode.ApiKeyNotFound]: {
            title: 'API Key not found',
            message: 'The API Key provided is not valid.',
        },
        [ErrorCode.AuthDoesNotHavePasswordToValidate]: {
            title: 'Auth does not have password to validate',
            message: 'The Auth does not have a password to validate.',
        },
        [ErrorCode.AuthNotFound]: {
            title: 'Auth not found',
            message: 'The Auth was not found.',
        },
        [ErrorCode.CantComparePasswords]: {
            title: 'Can\'t compare passwords',
            message: 'The passwords can\'t be compared.',
        },
        [ErrorCode.CantGetValueFromOption]: {
            title: 'Can\'t get value from option',
            message: 'The value can\'t be retrieved from the option.',
        },
        [ErrorCode.DocuFileNotFound]: {
            title: 'Docu file not found',
            message: 'The Docu file was not found.',
        },
        [ErrorCode.InvalidApiKeyValue]: {
            title: 'Invalid API Key value',
            message: 'The API Key value is not valid.',
        },
        [ErrorCode.InvalidId]: {
            title: 'Invalid ID',
            message: 'The ID provided is not valid.',
        },
        [ErrorCode.InvalidLogin]: {
            title: 'Invalid login',
            message: 'The login provided is not valid.',
        },
        [ErrorCode.InvalidMimeType]: {
            title: 'Invalid MIME type',
            message: 'The MIME type provided is not valid.',
        },
        [ErrorCode.InvalidPassword]: {
            title: 'Invalid password',
            message: 'The password provided is not valid.',
        },
        [ErrorCode.InvalidPermission]: {
            title: 'Invalid permission',
            message: 'The permission provided is not valid.',
        },
        [ErrorCode.InvalidSharedToken]: {
            title: 'Invalid shared token',
            message: 'The shared token provided is not valid.',
        },
        [ErrorCode.InvalidToken]: {
            title: 'Invalid token',
            message: 'The token provided is not valid.',
        },
        [ErrorCode.SharedDocuFileNotFound]: {
            title: 'Shared Docu file not found',
            message: 'The shared Docu file was not found.',
        },
        [ErrorCode.Unauthorized]: {
            title: 'Unauthorized',
            message: 'Access not allowed.',
        },
        [ErrorCode.UserAlreadyExists]: {
            title: 'User already exists',
            message: 'The user already exists.',
        },
        [ErrorCode.UserNotFound]: {
            title: 'User not found',
            message: 'The user was not found.',
        },
        [ErrorCode.WrongPassword]: {
            title: 'Wrong password',
            message: 'The password is wrong.',
        },
    }

    return map[errorCode];
}