import { AuthProxyController } from "../_shared/AuthProxyController";
import { exceptionHandler } from "../_shared/exceptionHandler";
import { initzializeDependencies } from "../_shared/initzializeDependencies";
import { GetUserAccountController } from "./_GetUserAccountController";

export const GET = exceptionHandler(initzializeDependencies(async (request, route) => {
    return new AuthProxyController(new GetUserAccountController()).run(request, route.params);
}));

