import { AuthProxyController } from "../_shared/AuthProxyController";
import { exceptionHandler } from "../_shared/exceptionHandler";
import { initzializeDependencies } from "../_shared/initzializeDependencies";
import { CreateFolderController } from "./_CreateFolderController";
import { GetRootFolderController } from "./_GetRootFolderController";

export const POST = exceptionHandler(initzializeDependencies(async (request, route) => {
    return new AuthProxyController(new CreateFolderController()).run(request, route.params);
}));

export const GET = exceptionHandler(initzializeDependencies(async (request, route) => {
    return new AuthProxyController(new GetRootFolderController()).run(request, route.params);
}));
