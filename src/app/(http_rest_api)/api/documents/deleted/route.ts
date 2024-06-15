import { AuthProxyController } from "../../_shared/AuthProxyController";
import { exceptionHandler } from "../../_shared/exceptionHandler";
import { initzializeDependencies } from "../../_shared/initzializeDependencies";
import { GetDeletedDocuFilesController } from "./_GetDeletedDocuFilesController";

export const GET = exceptionHandler(initzializeDependencies(async (request) => {
    return new AuthProxyController(new GetDeletedDocuFilesController()).run(request);
}));
