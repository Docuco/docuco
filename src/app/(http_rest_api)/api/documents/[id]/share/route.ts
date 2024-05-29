import { DIContainer } from "../../../../../_core/Shared/Infrastructure/DIContainer";
import { exceptionHandler } from "../../../_shared/exceptionHandler";
import { StartSharingDocuFileController } from "./_StartSharingDocuFileController";
import { StopSharingDocuFileController } from "./_StopSharingDocuFileController";

export const POST = exceptionHandler(async (request, route) => {
    await DIContainer.setup();
    return new StartSharingDocuFileController().run(request, route.params);
});

export const DELETE = exceptionHandler(async (request, route) => {
    await DIContainer.setup();
    return new StopSharingDocuFileController().run(request, route.params);
});