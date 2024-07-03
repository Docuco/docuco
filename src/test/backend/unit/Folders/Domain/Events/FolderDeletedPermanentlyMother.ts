import { DeepPartial } from "../../../Shared/Infrastructure/DeepPartial";
import { faker } from '@faker-js/faker';
import { Id } from "../../../../../../app/_core/Shared/Domain/VOs/Id";
import { FolderPrimitive } from "../../../../../../app/_core/Folders/Domain/Primitives/FolderPrimitive";
import { FolderPrimitiveMother } from "../Primitives/FolderPrimitiveMother";
import { FolderDeletedPermanently } from "../../../../../../app/_core/Folders/Domain/Events/FolderDeletedPermanently";

export class FolderDeletedPermanentlyMother {

    public static from(data: DeepPartial<FolderPrimitive>): FolderDeletedPermanently {
        const folder = FolderPrimitiveMother.from(data);

        return new FolderDeletedPermanently({
            attributes: folder,
            entityId: folder.id,
            eventId: Id.new().value,
            occurredOn: faker.date.past(),
        });
    }
}