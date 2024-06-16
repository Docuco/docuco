import { AuthProxyController } from "../../../../_shared/AuthProxyController";
import { exceptionHandler } from "../../../../_shared/exceptionHandler";
import { initzializeDependencies } from "../../../../_shared/initzializeDependencies";
import { RegenerateApiKeyController } from "./_RegenerateApiKeyController";

export const PUT = exceptionHandler(initzializeDependencies(async (request, route) => {
    return new AuthProxyController(new RegenerateApiKeyController()).run(request, route.params);
}));