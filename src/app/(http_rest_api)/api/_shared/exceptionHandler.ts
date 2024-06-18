import { NextRequest, NextResponse } from "next/server";
import { BaseException } from "../../../_core/Shared/Domain/Exceptions/BaseException";
import { ErrorCode } from "../../../_core/Shared/Domain/Exceptions/ErrorCode";

export function exceptionHandler(
    handler: (
        req: NextRequest,
        params: { params: Record<string, string> }
    ) => Promise<NextResponse>
) {
    return async (req: NextRequest, params: { params: Record<string, string> }): Promise<NextResponse> => {
        return handler(req, params).catch((error) => {
            if (error instanceof BaseException) {
                const { message, data, code } = error as BaseException
                const httpCode = mapErrors(code);

                const resObject = NextResponse.json({
                    code,
                    message,
                    data,
                }, { status: httpCode })

                return resObject
            }

            console.error('UNKNOWN_ERROR', error)

            const resObject = NextResponse.json({
                code: 'UNKNOWN_ERROR',
                message: error.message,
            }, { status: 500 });

            return resObject
        })
    }
}

function mapErrors(code: ErrorCode): number {
    const map: {[key in ErrorCode]: number} = {
        [ErrorCode.ApiKeyNotFound]: 404,
        [ErrorCode.AuthDoesNotHavePasswordToValidate]: 400,
        [ErrorCode.AuthNotFound]: 404,
        [ErrorCode.CantComparePasswords]: 400,
        [ErrorCode.CantGetValueFromOption]: 500,
        [ErrorCode.DocuFileNotFound]: 404,
        [ErrorCode.InvalidApiKeyValue]: 401,
        [ErrorCode.InvalidId]: 422,
        [ErrorCode.InvalidLogin]: 401,
        [ErrorCode.InvalidMimeType]: 422,
        [ErrorCode.InvalidPassword]: 422,
        [ErrorCode.InvalidPermission]: 422,
        [ErrorCode.InvalidSharedToken]: 422,
        [ErrorCode.InvalidToken]: 422,
        [ErrorCode.SharedDocuFileNotFound]: 404,
        [ErrorCode.Unauthorized]: 403,
        [ErrorCode.UserAlreadyExists]: 409,
        [ErrorCode.UserNotFound]: 404,
        [ErrorCode.WrongPassword]: 401,
    }

    return map[code] || 500;
}