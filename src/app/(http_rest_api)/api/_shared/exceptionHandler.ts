import { NextRequest, NextResponse } from "next/server";
import { BaseException } from "../../../_core/Shared/Domain/Exceptions/BaseException";
import { InvalidId } from "../../../_core/Shared/Domain/Exceptions/InvalidId";
import { DocuFileNotFound } from "../../../_core/Documents/Domain/Exceptions/DocuFileNotFound";

export function exceptionHandler(
    handler: (
        req: NextRequest,
        params: { params: Record<string, string> }
    ) => Promise<NextResponse>
) {
    return async (req: NextRequest, params: { params: Record<string, string> }): Promise<NextResponse> => {
        return handler(req, params).catch((error) => {
            if (error instanceof BaseException) {
                const { message, data } = error as BaseException
                const httpCode = mapErrors(error);

                const resObject = NextResponse.json({
                    error: error.constructor.name,
                    message,
                    data,
                }, { status: httpCode })

                return resObject
            }

            const resObject = NextResponse.json({
                error: 'Unknown error',
                name: error.name,
                message: error.message,
                stack: error.stack,
            }, { status: 500 });

            return resObject
        })
    }
}

function mapErrors(error: BaseException): number {
    switch (error.constructor.name) {
        case InvalidId.name:
            return 400;
        case DocuFileNotFound.name:
            return 404;
        default:
            return 500;
    }
}