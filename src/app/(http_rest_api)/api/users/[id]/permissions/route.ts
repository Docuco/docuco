import { AuthProxyController } from "../../../_shared/AuthProxyController";
import { exceptionHandler } from "../../../_shared/exceptionHandler";
import { initzializeDependencies } from "../../../_shared/initzializeDependencies";
import { ChangeUserPermissionsController } from "./_ChangeUserPermissionsController";

export const PUT = exceptionHandler(initzializeDependencies(async (request, route) => {
    return new AuthProxyController(new ChangeUserPermissionsController()).run(request, route.params);
}));