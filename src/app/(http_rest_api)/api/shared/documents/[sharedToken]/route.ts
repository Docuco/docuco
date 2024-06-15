import { exceptionHandler } from "../../../_shared/exceptionHandler";
import { initzializeDependencies } from "../../../_shared/initzializeDependencies";
import { GetDocuFileBySharedTokenController } from "./_GetDocuFileBySharedTokenController";

export const GET = exceptionHandler(initzializeDependencies(async (request, route) => {
    return new GetDocuFileBySharedTokenController().run(request, route.params);
}));
