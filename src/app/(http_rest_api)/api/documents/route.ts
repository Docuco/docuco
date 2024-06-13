import { DIContainer } from "../../../_core/Shared/Infrastructure/DIContainer";
import { AuthProxyController } from "../_shared/AuthProxyController";
import { exceptionHandler } from "../_shared/exceptionHandler";
import { GetDocuFilesController } from "./_GetDocuFilesController";
import { UploadDocumentsController } from "./_UploadDocumentsController";

export const POST = exceptionHandler(async (request) => {
    await DIContainer.setup();
    return new AuthProxyController(new UploadDocumentsController()).run(request);

});

export const GET = exceptionHandler(async (request) => {
    await DIContainer.setup();
    return new AuthProxyController(new GetDocuFilesController()).run(request);
});
