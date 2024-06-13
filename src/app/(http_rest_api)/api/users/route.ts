import { DIContainer } from "../../../_core/Shared/Infrastructure/DIContainer";
import { AuthProxyController } from "../_shared/AuthProxyController";
import { exceptionHandler } from "../_shared/exceptionHandler";
import { CreateUserController } from "./_CreateUserController";

export const POST = exceptionHandler(async (request) => {
    await DIContainer.setup();
    return new AuthProxyController(new CreateUserController()).run(request);
});
