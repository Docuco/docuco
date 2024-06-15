import { exceptionHandler } from "../../../_shared/exceptionHandler";
import { initzializeDependencies } from "../../../_shared/initzializeDependencies";
import { GetAuthFromApiKeyController } from "./_GetAuthFromApiKeyController";

export const POST = exceptionHandler(initzializeDependencies(async (request) => {
    return new GetAuthFromApiKeyController().run(request);
}));
