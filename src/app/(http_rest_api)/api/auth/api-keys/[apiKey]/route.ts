import { DIContainer } from "../../../../../_core/Shared/Infrastructure/DIContainer";
import { exceptionHandler } from "../../../_shared/exceptionHandler";
import { DeleteApiKeyController } from "./_DeleteApiKeyController";
import { UpdateApiKeyController } from "./_UpdateApiKeyController";

export const DELETE = exceptionHandler(async (request, route) => {
    await DIContainer.setup();
    return new DeleteApiKeyController().run(request, route.params);
});

export const PUT = exceptionHandler(async (request, route) => {
    await DIContainer.setup();
    return new UpdateApiKeyController().run(request, route.params);
});