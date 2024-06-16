import { AuthProxyController } from "../../../_shared/AuthProxyController";
import { exceptionHandler } from "../../../_shared/exceptionHandler";
import { initzializeDependencies } from "../../../_shared/initzializeDependencies";
import { ChangeUserPasswordController } from "./_ChangeUserPasswordController";

export const PUT = exceptionHandler(initzializeDependencies(async (request, route) => {
    return new AuthProxyController(new ChangeUserPasswordController()).run(request, route.params);
}));