import { AuthProxyController } from "../../../_shared/AuthProxyController";
import { exceptionHandler } from "../../../_shared/exceptionHandler";
import { initzializeDependencies } from "../../../_shared/initzializeDependencies";
import { RestoreDocuFileController } from "./_RestoreDocuFileController";

export const POST = exceptionHandler(initzializeDependencies(async (request, route) => {
    return new AuthProxyController(new RestoreDocuFileController()).run(request, route.params);
}));