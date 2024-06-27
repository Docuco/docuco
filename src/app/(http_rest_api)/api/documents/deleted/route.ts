import { AuthProxyController } from "../../_shared/AuthProxyController";
import { exceptionHandler } from "../../_shared/exceptionHandler";
import { initzializeDependencies } from "../../_shared/initzializeDependencies";
import { GetRootDeletedDocuFilesController } from "./_GetRootDeletedDocuFilesController";

export const GET = exceptionHandler(initzializeDependencies(async (request, route) => {
    return new AuthProxyController(new GetRootDeletedDocuFilesController()).run(request, route.params);
}));
