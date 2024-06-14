import { DIContainer } from "../../../../../_core/Shared/Infrastructure/DIContainer";
import { exceptionHandler } from "../../../_shared/exceptionHandler";
import { DeleteApiKeyController } from "./_DeleteApiKeyController";
import { ChangeApiKeyPermissionsController } from "./_ChangeApiKeyPermissionsController";

export const DELETE = exceptionHandler(async (request, route) => {
    await DIContainer.setup();
    return new DeleteApiKeyController().run(request, route.params);
});

export const PUT = exceptionHandler(async (request, route) => {
    await DIContainer.setup();
    return new ChangeApiKeyPermissionsController().run(request, route.params);
});