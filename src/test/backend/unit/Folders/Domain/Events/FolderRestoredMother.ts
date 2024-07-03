import { DeepPartial } from "../../../Shared/Infrastructure/DeepPartial";
import { faker } from '@faker-js/faker';
import { Id } from "../../../../../../app/_core/Shared/Domain/VOs/Id";
import { FolderPrimitive } from "../../../../../../app/_core/Folders/Domain/Primitives/FolderPrimitive";
import { FolderPrimitiveMother } from "../Primitives/FolderPrimitiveMother";
import { FolderRestored } from "../../../../../../app/_core/Folders/Domain/Events/FolderRestored";

export class FolderRestoredMother {

    public static from(data: DeepPartial<FolderPrimitive>): FolderRestored {
        const folder = FolderPrimitiveMother.from(data);

        return new FolderRestored({
            attributes: folder,
            entityId: folder.id,
            eventId: Id.new().value,
            occurredOn: faker.date.past(),
        });
    }
}