import { DeepPartial } from "../../../Shared/Infrastructure/DeepPartial";
import { faker } from '@faker-js/faker';
import { Id } from "../../../../../../app/_core/Shared/Domain/VOs/Id";
import { FolderPrimitive } from "../../../../../../app/_core/Folders/Domain/Primitives/FolderPrimitive";
import { FolderPrimitiveMother } from "../Primitives/FolderPrimitiveMother";
import { FolderDeleted } from "../../../../../../app/_core/Folders/Domain/Events/FolderDeleted";

export class FolderDeletedMother {

    public static from(data: DeepPartial<FolderPrimitive>): FolderDeleted {
        const folder = FolderPrimitiveMother.from(data);

        return new FolderDeleted({
            attributes: folder,
            entityId: folder.id,
            eventId: Id.new().value,
            occurredOn: faker.date.past(),
        });
    }
}