import { DIContainer } from "../../../../../_core/Shared/Infrastructure/DIContainer";
import { exceptionHandler } from "../../../_shared/exceptionHandler";
import { ChangeSettingsController } from "./_ChangeSettingsController";

export const PUT = exceptionHandler(async (request, route) => {
    await DIContainer.setup();
    return new ChangeSettingsController().run(request, route.params);
});