import { AuthProxyController } from "../../_shared/AuthProxyController";
import { exceptionHandler } from "../../_shared/exceptionHandler";
import { initzializeDependencies } from "../../_shared/initzializeDependencies";
import { CreateApiKeyController } from "./_CreateApiKeyController";
import { GetAllApiKeysController } from "./_GetAllApiKeysController";

export const POST = exceptionHandler(initzializeDependencies(async (request) => {
    return new AuthProxyController(new CreateApiKeyController()).run(request);
}));

export const GET = exceptionHandler(initzializeDependencies(async (request) => {
    return new AuthProxyController(new GetAllApiKeysController()).run(request);
}));