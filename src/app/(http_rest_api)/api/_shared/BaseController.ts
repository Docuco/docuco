import { NextRequest, NextResponse } from "next/server";

export interface BaseController {
    run(req: NextRequest, pathParams?: Record<string, string>): Promise<NextResponse>
} 