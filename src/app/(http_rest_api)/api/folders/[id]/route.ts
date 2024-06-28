import { AuthProxyController } from "../../_shared/AuthProxyController";
import { exceptionHandler } from "../../_shared/exceptionHandler";
import { initzializeDependencies } from "../../_shared/initzializeDependencies";
import { DeleteFolderController } from "./_DeleteFolderController";
import { GetFolderByParentIdController } from "./_GetFolderByParentIdController";

export const GET = exceptionHandler(initzializeDependencies(async (request, route) => {
    return new AuthProxyController(new GetFolderByParentIdController()).run(request, route.params);
}));

export const DELETE = exceptionHandler(initzializeDependencies(async (request, route) => {
    return new AuthProxyController(new DeleteFolderController()).run(request, route.params);
}));