import { DIContainer } from "../../../../_core/Shared/Infrastructure/DIContainer";
import { exceptionHandler } from "../../_shared/exceptionHandler";
import { GetUserController } from "./_GetUserController";

export const GET = exceptionHandler(async (request, route) => {
    await DIContainer.setup();
    return new GetUserController().run(request, route.params);
});