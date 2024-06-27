import { AuthProxyController } from "../../../_shared/AuthProxyController";
import { exceptionHandler } from "../../../_shared/exceptionHandler";
import { initzializeDependencies } from "../../../_shared/initzializeDependencies";
import { GetDocuFilesFromFolderController } from "./_GetDocuFilesFromFolderController";

export const GET = exceptionHandler(initzializeDependencies(async (request, route) => {
    return new AuthProxyController(new GetDocuFilesFromFolderController()).run(request, route.params);
}));
