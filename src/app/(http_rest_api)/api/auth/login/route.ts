import { DIContainer } from "../../../../_core/Shared/Infrastructure/DIContainer";
import { exceptionHandler } from "../../_shared/exceptionHandler";
import { GetAuthFromLoginController } from "./_GetAuthFromLoginController";

export const POST = exceptionHandler(async (request, route) => {
    await DIContainer.setup();
    return new GetAuthFromLoginController().run(request, route.params);
});
