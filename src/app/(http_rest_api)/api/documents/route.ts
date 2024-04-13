import { DIContainer } from "../../../_core/Shared/Infrastructure/DIContainer";
import { exceptionHandler } from "../_shared/exceptionHandler";
import { GetDocuFilesController } from "./_GetDocuFilesController";
import { UploadDocumentsController } from "./_UploadDocumentsController";

export const POST = exceptionHandler(async (request) => {
    await DIContainer.setup();
    return new UploadDocumentsController().run(request);
});

export const GET = exceptionHandler(async (request) => {
    await DIContainer.setup();
    return new GetDocuFilesController().run(request);
});
