import { AuthProxyController } from "../../../_shared/AuthProxyController";
import { exceptionHandler } from "../../../_shared/exceptionHandler";
import { initzializeDependencies } from "../../../_shared/initzializeDependencies";
import { StartSharingDocuFileController } from "./_StartSharingDocuFileController";
import { StopSharingDocuFileController } from "./_StopSharingDocuFileController";

export const POST = exceptionHandler(initzializeDependencies(async (request, route) => {
    return new AuthProxyController(new StartSharingDocuFileController()).run(request, route.params);
}));

export const DELETE = exceptionHandler(initzializeDependencies(async (request, route) => {
    return new AuthProxyController(new StopSharingDocuFileController()).run(request, route.params);
}));