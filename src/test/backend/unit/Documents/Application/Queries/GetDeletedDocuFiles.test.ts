import { deepEqual, when } from "ts-mockito";
import { Id } from "../../../../../../app/_core/Shared/Domain/VOs/Id";
import { DocuFile } from "../../../../../../app/_core/Documents/Domain/Entities/DocuFile";
import { DocuFilePrimitiveMother } from "../../Domain/Mothers/DocuFilePrimitiveMother";
import { GetDeletedDocuFiles } from "../../../../../../app/_core/Documents/Application/Queries/GetDeletedDocuFiles";
import { InterfaceMock } from "../../../Shared/Infrastructure/InterfaceMock";
import { DocuFileRepository } from "../../../../../../app/_core/Documents/Domain/Repositories/DocuFileRepository";
import { Option } from "../../../../../../app/_core/Shared/Domain/VOs/Option";

describe('GetDeletedDocuFiles', () => {

    const docuFileRepositoryMock = new InterfaceMock<DocuFileRepository>();

    afterEach(() => {
        docuFileRepositoryMock.reset();
    });
   
    test(`
        GIVEN an existing deleted docuFiles
        WHEN I get the deleted docuFiles
        THEN return the deleted docuFiles
    `, async () => {
        const parentFolderId = Id.new().value;
        const deletedDocuFilesPrimitive = DocuFilePrimitiveMother.generateWith({
            isDeleted: true,
            parentFolderId,
        });

        when(docuFileRepositoryMock.mockito.getDeleted(deepEqual({
            parentFolderId: Option.some(new Id(parentFolderId))
        }))).thenResolve(deletedDocuFilesPrimitive.map(DocuFile.fromPrimitives));

        const getDeletedDocuFiles = new GetDeletedDocuFiles(
            docuFileRepositoryMock.instance(),
        );
        const deletedDocuFiles = await getDeletedDocuFiles.run(parentFolderId);

        docuFileRepositoryMock.expectMethodToHaveBeenCalledTimes('getDeleted', 1);
        expect(deletedDocuFiles).toEqual(deletedDocuFilesPrimitive.map(DocuFile.fromPrimitives));
    });
})