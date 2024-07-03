import { DocuMimeType } from "../../../../../../app/_core/Documents/Domain/VOs/DocuMimeType";
import { faker } from '@faker-js/faker';

export class DocuMimeTypeMother {

    public static random(): DocuMimeType {
        return new DocuMimeType(faker.helpers.arrayElement(DocuMimeType.ValidValues));
    }
}