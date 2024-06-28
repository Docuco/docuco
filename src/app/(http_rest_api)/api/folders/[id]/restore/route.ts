import { AuthProxyController } from "../../../_shared/AuthProxyController";
import { exceptionHandler } from "../../../_shared/exceptionHandler";
import { initzializeDependencies } from "../../../_shared/initzializeDependencies";
import { RestoreFolderController } from "./_RestoreFolderController";

export const POST = exceptionHandler(initzializeDependencies(async (request, route) => {
    return new AuthProxyController(new RestoreFolderController()).run(request, route.params);
}));