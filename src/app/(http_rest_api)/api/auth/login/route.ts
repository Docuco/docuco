import { exceptionHandler } from "../../_shared/exceptionHandler";
import { initzializeDependencies } from "../../_shared/initzializeDependencies";
import { GetAuthFromLoginController } from "./_GetAuthFromLoginController";

export const POST = exceptionHandler(initzializeDependencies(async (request, route) => {
    return new GetAuthFromLoginController().run(request, route.params);
}));
