import { exceptionHandler } from "../../../../_shared/exceptionHandler";
import { initzializeDependencies } from "../../../../_shared/initzializeDependencies";
import { ChangeApiKeyPermissionsController } from "./_ChangeApiKeyPermissionsController";

export const PUT = exceptionHandler(initzializeDependencies(async (request, route) => {
    return new ChangeApiKeyPermissionsController().run(request, route.params);
}));