import { AuthProxyController } from "../_shared/AuthProxyController";
import { exceptionHandler } from "../_shared/exceptionHandler";
import { initzializeDependencies } from "../_shared/initzializeDependencies";
import { CreateUserController } from "./_CreateUserController";

export const POST = exceptionHandler(initzializeDependencies(async (request) => {
    return new AuthProxyController(new CreateUserController()).run(request);
}));
