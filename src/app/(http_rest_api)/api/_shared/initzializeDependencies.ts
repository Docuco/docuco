import { NextRequest, NextResponse } from "next/server";
import { DIContainer } from "../../../_core/Shared/Infrastructure/DIContainer";

export function initzializeDependencies(
    handler: (
        req: NextRequest,
        params: { params: Record<string, string> }
    ) => Promise<NextResponse>
) {
    return async (req: NextRequest, params: { params: Record<string, string> }): Promise<NextResponse> => {
        await DIContainer.setup();
        const response = await handler(req, params)
        await DIContainer.destroy();

        return response
    }
}
