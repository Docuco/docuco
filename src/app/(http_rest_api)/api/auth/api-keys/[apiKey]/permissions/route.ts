import { DIContainer } from "../../../../../../_core/Shared/Infrastructure/DIContainer";
import { exceptionHandler } from "../../../../_shared/exceptionHandler";
import { ChangeApiKeyPermissionsController } from "./_ChangeApiKeyPermissionsController";

export const PUT = exceptionHandler(async (request, route) => {
    await DIContainer.setup();
    return new ChangeApiKeyPermissionsController().run(request, route.params);
});