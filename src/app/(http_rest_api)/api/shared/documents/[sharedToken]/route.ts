import { DIContainer } from "../../../../../_core/Shared/Infrastructure/DIContainer";
import { exceptionHandler } from "../../../_shared/exceptionHandler";
import { GetDocuFileBySharedTokenController } from "./_GetDocuFileBySharedTokenController";

export const GET = exceptionHandler(async (request, route) => {
    await DIContainer.setup();
    return new GetDocuFileBySharedTokenController().run(request, route.params);
});
