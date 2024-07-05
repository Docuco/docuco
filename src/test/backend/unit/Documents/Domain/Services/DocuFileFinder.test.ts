import { deepEqual, when } from "ts-mockito";
import { InterfaceMock } from "../../../Shared/Infrastructure/InterfaceMock";
import { DocuFileRepository } from "../../../../../../app/_core/Documents/Domain/Repositories/DocuFileRepository";
import { DocuFilePrimitiveMother } from "../Primitives/DocuFilePrimitiveMother";
import { DocuFile } from "../../../../../../app/_core/Documents/Domain/Entities/DocuFile";
import { DocuFileFinder } from "../../../../../../app/_core/Documents/Domain/Services/DocuFileFinder";
import { Id } from "../../../../../../app/_core/Shared/Domain/VOs/Id";
import { Option } from "../../../../../../app/_core/Shared/Domain/VOs/Option";
import { expectToThrow } from "../../../Shared/Infrastructure/ExpectoToThrow";
import { DocuFileNotFound } from "../../../../../../app/_core/Documents/Domain/Exceptions/DocuFileNotFound";

describe('DocuFileFinder', () => {

    const docuFileRepositoryMock = new InterfaceMock<DocuFileRepository>();

    afterEach(() => {
        docuFileRepositoryMock.reset();
    });

    test(`
        GIVEN a existing docuFile
        WHEN call to docuFile finder with the docuFile id
        THEN return the docuFile
    `, async () => {
        const docuFileId = Id.new().value;
        const docuFile = DocuFilePrimitiveMother.from({
            id: docuFileId
        })

        when(docuFileRepositoryMock.mockito.findById(deepEqual(new Id(docuFileId))))
            .thenResolve(Option.some(DocuFile.fromPrimitives(docuFile)));

        const docuFileFinder = new DocuFileFinder(
            docuFileRepositoryMock.instance(),
        );
        const docuFileResponse = await docuFileFinder.run(new Id(docuFileId));

        expect(docuFileResponse).toEqual(DocuFile.fromPrimitives(docuFile));
    });

    test(`
        GIVEN a non existing docuFile
        WHEN call to docuFile finder with the docuFile id
        THEN throw "DocuFileNotFound" exception
    `, async () => {
        const docuFileId = Id.new().value;

        when(docuFileRepositoryMock.mockito.findById(deepEqual(new Id(docuFileId))))
            .thenResolve(Option.none());

        const docuFileFinder = new DocuFileFinder(
            docuFileRepositoryMock.instance(),
        );
        await expectToThrow(
            docuFileFinder.run(new Id(docuFileId)),
            DocuFileNotFound
        )
    });
})