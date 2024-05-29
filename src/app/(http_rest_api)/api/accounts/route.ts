import { DIContainer } from "../../../_core/Shared/Infrastructure/DIContainer";
import { exceptionHandler } from "../_shared/exceptionHandler";
import { CreateUserController } from "./_CreateUserController";

export const POST = exceptionHandler(async (request) => {
    await DIContainer.setup();
    return new CreateUserController().run(request);
});
