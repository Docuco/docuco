import { AuthProxyController } from "../../../_shared/AuthProxyController";
import { exceptionHandler } from "../../../_shared/exceptionHandler";
import { initzializeDependencies } from "../../../_shared/initzializeDependencies";
import { DeleteApiKeyController } from "./_DeleteApiKeyController";
import { UpdateApiKeyController } from "./_UpdateApiKeyController";

export const DELETE = exceptionHandler(initzializeDependencies(async (request, route) => {
    return new AuthProxyController(new DeleteApiKeyController()).run(request, route.params);
}));

export const PUT = exceptionHandler(initzializeDependencies(async (request, route) => {
    return new AuthProxyController(new UpdateApiKeyController()).run(request, route.params);
}));