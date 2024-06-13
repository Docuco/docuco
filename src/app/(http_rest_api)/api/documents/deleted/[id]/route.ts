import { DIContainer } from "../../../../../_core/Shared/Infrastructure/DIContainer";
import { AuthProxyController } from "../../../_shared/AuthProxyController";
import { exceptionHandler } from "../../../_shared/exceptionHandler";
import { DeletePermanentlyDocuFileController } from "./_DeletePermanentlyDocuFileController";

export const DELETE = exceptionHandler(async (request, route) => {
    await DIContainer.setup();
    return new AuthProxyController(new DeletePermanentlyDocuFileController()).run(request, route.params);
});
