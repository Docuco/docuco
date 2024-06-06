import { DIContainer } from "../../../../../_core/Shared/Infrastructure/DIContainer";
import { AuthProxyController } from "../../../_shared/AuthProxyController";
import { exceptionHandler } from "../../../_shared/exceptionHandler";
import { StartSharingDocuFileController } from "./_StartSharingDocuFileController";
import { StopSharingDocuFileController } from "./_StopSharingDocuFileController";

export const POST = exceptionHandler(async (request, route) => {
    await DIContainer.setup();
    return new AuthProxyController(new StartSharingDocuFileController()).run(request, route.params);

});

export const DELETE = exceptionHandler(async (request, route) => {
    await DIContainer.setup();
    return new AuthProxyController(new StopSharingDocuFileController()).run(request, route.params);
});