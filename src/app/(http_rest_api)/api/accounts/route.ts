import { DIContainer } from "../../../_core/Shared/Infrastructure/DIContainer";
import { exceptionHandler } from "../_shared/exceptionHandler";
import { CreateAccountController } from "./_CreateAccountController";

export const POST = exceptionHandler(async (request) => {
    await DIContainer.setup();
    return new CreateAccountController().run(request);
});
