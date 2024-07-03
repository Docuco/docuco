import { DocuFileDeletedPermanently } from "../../../../../../app/_core/Documents/Domain/Events/DocuFileDeletedPermanently";
import { DocuFilePrimitive } from "../../../../../../app/_core/Documents/Domain/Primitives/DocuFilePrimitive";
import { DeepPartial } from "../../../Shared/Infrastructure/DeepPartial";
import { faker } from '@faker-js/faker';
import { DocuFilePrimitiveMother } from "../Primitives/DocuFilePrimitiveMother";
import { Id } from "../../../../../../app/_core/Shared/Domain/VOs/Id";

export class DocuFileDeletedPermanentlyMother {

    public static from(data: DeepPartial<DocuFilePrimitive>): DocuFileDeletedPermanently {
        const docuFile = DocuFilePrimitiveMother.from(data);

        return new DocuFileDeletedPermanently({
            attributes: docuFile,
            entityId: docuFile.id,
            eventId: Id.new().value,
            occurredOn: faker.date.past(),
        });
    }
}