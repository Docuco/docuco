import { DIContainer } from "../../../../_core/Shared/Infrastructure/DIContainer";
import { AuthProxyController } from "../../_shared/AuthProxyController";
import { exceptionHandler } from "../../_shared/exceptionHandler";
import { DeleteDocuFileController } from "./_DeleteDocuFileController";
import { GetDocuFileController } from "./_GetDocuFileController";

export const DELETE = exceptionHandler(async (request, route) => {
    await DIContainer.setup();
    return new AuthProxyController(new DeleteDocuFileController()).run(request, route.params);
});

export const GET = exceptionHandler(async (request, route) => {
    await DIContainer.setup();
    return new AuthProxyController(new GetDocuFileController()).run(request, route.params);
});