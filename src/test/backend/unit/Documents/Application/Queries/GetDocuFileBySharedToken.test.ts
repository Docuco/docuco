import { deepEqual, when } from "ts-mockito";
import { Id } from "../../../../../../app/_core/Shared/Domain/VOs/Id";
import { DocuFile } from "../../../../../../app/_core/Documents/Domain/Entities/DocuFile";
import { DocuFilePrimitiveMother } from "../../Domain/Mothers/DocuFilePrimitiveMother";
import { GetDocuFileBySharedToken } from "../../../../../../app/_core/Documents/Application/Queries/GetDocuFileBySharedToken";
import { InterfaceMock } from "../../../Shared/Infrastructure/InterfaceMock";
import { DocuFileRepository } from "../../../../../../app/_core/Documents/Domain/Repositories/DocuFileRepository";
import { SharedToken } from "../../../../../../app/_core/Shared/Domain/VOs/ShareToken";
import { Option } from "../../../../../../app/_core/Shared/Domain/VOs/Option";
import { expectToThrow } from "../../../Shared/Infrastructure/ExpectoToThrow";
import { SharedDocuFileNotFound } from "../../../../../../app/_core/Documents/Domain/Exceptions/SharedDocuFileNotFound";

describe('GetDocuFileBySharedToken', () => {

    const docuFileRepositoryMock = new InterfaceMock<DocuFileRepository>();

    afterEach(() => {
        docuFileRepositoryMock.reset();
    });
   
    test(`
        GIVEN an existing shared docuFile
        WHEN I get the docuFile by shared token
        THEN return the docuFile
    `, async () => {
        const sharedToken = Id.new().value;
        const docuFilePrimitive = DocuFilePrimitiveMother.from({
            sharedToken,
        });

        when(docuFileRepositoryMock.mockito.findBySharedToken(deepEqual(new SharedToken(sharedToken))))
            .thenResolve(Option.some(DocuFile.fromPrimitives(docuFilePrimitive)));

        const getDocuFileBySharedToken = new GetDocuFileBySharedToken(
            docuFileRepositoryMock.instance(),
        );
        const docuFile = await getDocuFileBySharedToken.run({ sharedToken });

        expect(docuFile).toEqual(DocuFile.fromPrimitives(docuFilePrimitive));
    });

    test(`
        GIVEN a non existing shared docuFile
        WHEN I get the docuFile by shared token
        THEN throw "SharedDocuFileNotFound" exception
    `, async () => {
        const sharedToken = Id.new().value;

        when(docuFileRepositoryMock.mockito.findBySharedToken(deepEqual(new SharedToken(sharedToken))))
            .thenResolve(Option.none());

        const getDocuFileBySharedToken = new GetDocuFileBySharedToken(
            docuFileRepositoryMock.instance(),
        );
        
        await expectToThrow(
            getDocuFileBySharedToken.run({ sharedToken }),
            SharedDocuFileNotFound
        )
    });
})