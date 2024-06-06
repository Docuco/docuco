import { DIContainer } from "../../../../_core/Shared/Infrastructure/DIContainer";
import { AuthProxyController } from "../../_shared/AuthProxyController";
import { exceptionHandler } from "../../_shared/exceptionHandler";
import { GetUserController } from "./_GetUserController";

export const GET = exceptionHandler(async (request, route) => {
    await DIContainer.setup();
    return new AuthProxyController(new GetUserController()).run(request, route.params);
});