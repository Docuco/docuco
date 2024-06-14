import { DIContainer } from "../../../../../_core/Shared/Infrastructure/DIContainer";
import { exceptionHandler } from "../../../_shared/exceptionHandler";
import { GetAuthFromApiKeyController } from "./_GetAuthFromApiKeyController";

export const POST = exceptionHandler(async (request) => {
    await DIContainer.setup();
    return new GetAuthFromApiKeyController().run(request);
});
