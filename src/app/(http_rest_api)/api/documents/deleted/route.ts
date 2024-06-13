import { DIContainer } from "../../../../_core/Shared/Infrastructure/DIContainer";
import { AuthProxyController } from "../../_shared/AuthProxyController";
import { exceptionHandler } from "../../_shared/exceptionHandler";
import { GetDeletedDocuFilesController } from "./_GetDeletedDocuFilesController";

export const GET = exceptionHandler(async (request) => {
    await DIContainer.setup();
    return new AuthProxyController(new GetDeletedDocuFilesController()).run(request);
});
