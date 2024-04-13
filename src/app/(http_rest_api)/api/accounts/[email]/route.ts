import { DIContainer } from "../../../../_core/Shared/Infrastructure/DIContainer";
import { exceptionHandler } from "../../_shared/exceptionHandler";
import { GetAccountController } from "./_GetAccountController";

export const GET = exceptionHandler(async (request, route) => {
    await DIContainer.setup();
    return new GetAccountController().run(request, route.params);
});