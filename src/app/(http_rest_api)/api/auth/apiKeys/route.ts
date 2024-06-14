import { DIContainer } from "../../../../_core/Shared/Infrastructure/DIContainer";
import { exceptionHandler } from "../../_shared/exceptionHandler";
import { CreateApiKeyController } from "./_CreateApiKeyController";
import { GetAllApiKeysController } from "./_GetAllApiKeysController";

export const POST = exceptionHandler(async (request) => {
    await DIContainer.setup();
    return new CreateApiKeyController().run(request);
});

export const GET = exceptionHandler(async (request) => {
    await DIContainer.setup();
    return new GetAllApiKeysController().run(request);
});