import { DIContainer } from "../../../../_core/Shared/Infrastructure/DIContainer";
import { exceptionHandler } from "../../_shared/exceptionHandler";
import { DeleteDocuFileController } from "./_DeleteDocuFileController";
import { GetDocuFileController } from "./_GetDocuFileController";

export const DELETE = exceptionHandler(async (request, route) => {
    await DIContainer.setup();
    return new DeleteDocuFileController().run(request, route.params);
});

export const GET = exceptionHandler(async (request, route) => {
    await DIContainer.setup();
    return new GetDocuFileController().run(request, route.params);
});