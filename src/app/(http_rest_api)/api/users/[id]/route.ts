import { AuthProxyController } from "../../_shared/AuthProxyController";
import { exceptionHandler } from "../../_shared/exceptionHandler";
import { initzializeDependencies } from "../../_shared/initzializeDependencies";
import { DeleteUserController } from "./_DeleteUserController";
import { GetUserController } from "./_GetUserController";

export const GET = exceptionHandler(initzializeDependencies(async (request, route) => {
    return new AuthProxyController(new GetUserController()).run(request, route.params);
}));

export const DELETE = exceptionHandler(initzializeDependencies(async (request, route) => {
    return new AuthProxyController(new DeleteUserController()).run(request, route.params);
}));