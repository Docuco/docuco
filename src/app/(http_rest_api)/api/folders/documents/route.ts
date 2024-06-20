import { AuthProxyController } from "../../_shared/AuthProxyController";
import { exceptionHandler } from "../../_shared/exceptionHandler";
import { initzializeDependencies } from "../../_shared/initzializeDependencies";
import { GetDocumentsFromRootFolderController } from "./_GetDocumentsFromRootFolderController";

export const GET = exceptionHandler(initzializeDependencies(async (request) => {
    return new AuthProxyController(new GetDocumentsFromRootFolderController()).run(request);
}));
