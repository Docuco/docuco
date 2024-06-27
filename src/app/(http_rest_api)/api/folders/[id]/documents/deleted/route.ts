import { AuthProxyController } from "../../../../_shared/AuthProxyController";
import { exceptionHandler } from "../../../../_shared/exceptionHandler";
import { initzializeDependencies } from "../../../../_shared/initzializeDependencies";
import { GetDeletedDocuFilesByParentController } from "./_GetDeletedDocuFilesByParentController";

export const GET = exceptionHandler(initzializeDependencies(async (request, route) => {
    return new AuthProxyController(new GetDeletedDocuFilesByParentController()).run(request, route.params);
}));
