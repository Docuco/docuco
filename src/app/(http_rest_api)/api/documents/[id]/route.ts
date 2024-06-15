import { AuthProxyController } from "../../_shared/AuthProxyController";
import { exceptionHandler } from "../../_shared/exceptionHandler";
import { initzializeDependencies } from "../../_shared/initzializeDependencies";
import { DeleteDocuFileController } from "./_DeleteDocuFileController";
import { GetDocuFileController } from "./_GetDocuFileController";

export const DELETE = exceptionHandler(initzializeDependencies(async (request, route) => {
    return new AuthProxyController(new DeleteDocuFileController()).run(request, route.params);
}));

export const GET = exceptionHandler(initzializeDependencies(async (request, route) => {
    return new AuthProxyController(new GetDocuFileController()).run(request, route.params);
}));