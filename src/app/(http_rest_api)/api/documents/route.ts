import { AuthProxyController } from "../_shared/AuthProxyController";
import { exceptionHandler } from "../_shared/exceptionHandler";
import { initzializeDependencies } from "../_shared/initzializeDependencies";
import { GetDocuFilesController } from "./_GetDocuFilesController";
import { UploadDocumentsController } from "./_UploadDocumentsController";

export const POST = exceptionHandler(initzializeDependencies(async (request) => {
    return new AuthProxyController(new UploadDocumentsController()).run(request);
}));

export const GET = exceptionHandler(initzializeDependencies(async (request) => {
    return new AuthProxyController(new GetDocuFilesController()).run(request);
}));
