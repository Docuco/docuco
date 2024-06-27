import { AuthProxyController } from "../../../_shared/AuthProxyController";
import { exceptionHandler } from "../../../_shared/exceptionHandler";
import { initzializeDependencies } from "../../../_shared/initzializeDependencies";
import { DeletePermanentlyDocuFileController } from "./_DeletePermanentlyDocuFileController";

export const DELETE = exceptionHandler(initzializeDependencies(async (request, route) => {
    return new AuthProxyController(new DeletePermanentlyDocuFileController()).run(request, route.params);
}));
