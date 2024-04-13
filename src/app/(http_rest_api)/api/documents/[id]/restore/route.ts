import { DIContainer } from "../../../../../_core/Shared/Infrastructure/DIContainer";
import { exceptionHandler } from "../../../_shared/exceptionHandler";
import { RestoreDocuFileController } from "./_RestoreDocuFileController";

export const POST = exceptionHandler(async (request, route) => {
    await DIContainer.setup();
    return new RestoreDocuFileController().run(request, route.params);
});