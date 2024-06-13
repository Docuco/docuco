import { DIContainer } from "../../../../../_core/Shared/Infrastructure/DIContainer";
import { AuthProxyController } from "../../../_shared/AuthProxyController";
import { exceptionHandler } from "../../../_shared/exceptionHandler";
import { RestoreDocuFileController } from "./_RestoreDocuFileController";

export const POST = exceptionHandler(async (request, route) => {
    await DIContainer.setup();
    return new AuthProxyController(new RestoreDocuFileController()).run(request, route.params);
});