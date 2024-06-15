import { DIContainer } from "../../../../../../_core/Shared/Infrastructure/DIContainer";
import { exceptionHandler } from "../../../../_shared/exceptionHandler";
import { RegenerateApiKeyController } from "./_RegenerateApiKeyController";

export const PUT = exceptionHandler(async (request, route) => {
    await DIContainer.setup();
    return new RegenerateApiKeyController().run(request, route.params);
});