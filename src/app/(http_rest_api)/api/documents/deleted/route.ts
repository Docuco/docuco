import { DIContainer } from "../../../../_core/Shared/Infrastructure/DIContainer";
import { exceptionHandler } from "../../_shared/exceptionHandler";
import { GetDeletedDocuFilesController } from "./_GetDeletedDocuFilesController";

export const GET = exceptionHandler(async (request) => {
    await DIContainer.setup();
    return new GetDeletedDocuFilesController().run(request);
});
