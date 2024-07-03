import { deepEqual, instance, mock, reset, when } from "ts-mockito";
import { Id } from "../../../../../../app/_core/Shared/Domain/VOs/Id";
import { DocuFile } from "../../../../../../app/_core/Documents/Domain/Entities/DocuFile";
import { DocuFilePrimitiveMother } from "../../Domain/Mothers/DocuFilePrimitiveMother";
import { InterfaceMock } from "../../../Shared/Infrastructure/InterfaceMock";
import { DocuFileRepository } from "../../../../../../app/_core/Documents/Domain/Repositories/DocuFileRepository";
import { SharedToken } from "../../../../../../app/_core/Shared/Domain/VOs/ShareToken";
import { Option } from "../../../../../../app/_core/Shared/Domain/VOs/Option";
import { GetDocuFilesInFolder } from "../../../../../../app/_core/Documents/Application/Queries/GetDocuFilesInFolder";
import { FolderFinder } from "../../../../../../app/_core/Folders/Domain/Services/FolderFinder";
import { Folder } from "../../../../../../app/_core/Folders/Domain/Entities/Folder";
import { FolderPrimitiveMother } from "../../../Folders/Domain/Mothers/FolderPrimitiveMother";
import { expectToThrow } from "../../../Shared/Infrastructure/ExpectoToThrow";
import { FolderNotFound } from "../../../../../../app/_core/Folders/Domain/Exceptions/FolderNotFound";
import { DocuFileFilters } from "../../../../../../app/_core/Documents/Domain/VOs/DocuFileFilters";

describe('GetDocuFilesInFolder', () => {

    const docuFileRepositoryMock = new InterfaceMock<DocuFileRepository>();
    const folderFinderMock = mock(FolderFinder);

    afterEach(() => {
        docuFileRepositoryMock.reset();
        reset(folderFinderMock);
    });
   
    test(`
        GIVEN an existing docuFiles in root folder
        WHEN I get the docuFiles with parent folder null
        THEN return the docuFiles in root folder
    `, async () => {
        const docuFilesPrimitive = DocuFilePrimitiveMother.generateWith({
            parentFolderId: null,
        });

        when(docuFileRepositoryMock.mockito.getAll(deepEqual({
            parentFolderId: Option.none(),
            filters: Option.none()
        }))).thenResolve(docuFilesPrimitive.map(DocuFile.fromPrimitives));

        const getDocuFilesInFolder = new GetDocuFilesInFolder(
            docuFileRepositoryMock.instance(),
            instance(folderFinderMock),
        );
        const docuFiles = await getDocuFilesInFolder.run({
            parentFolderId: null
        });

        expect(docuFiles).toEqual(docuFilesPrimitive.map(DocuFile.fromPrimitives));
    });

    test(`
        GIVEN an existing docuFiles in folder
        WHEN I get the docuFiles by parent folder
        THEN return the docuFiles
    `, async () => {
        const folderPrimitive = FolderPrimitiveMother.from({
            isDeleted: false,
        });
        const docuFilesPrimitive = DocuFilePrimitiveMother.generateWith({
            parentFolderId: folderPrimitive.id,
        });

        when(folderFinderMock.run(deepEqual(new Id(folderPrimitive.id))))
            .thenResolve(Folder.fromPrimitives(folderPrimitive));
        when(docuFileRepositoryMock.mockito.getAll(deepEqual({
            parentFolderId: Option.some(new Id(folderPrimitive.id)),
            filters: Option.none()
        }))).thenResolve(docuFilesPrimitive.map(DocuFile.fromPrimitives));

        const getDocuFilesInFolder = new GetDocuFilesInFolder(
            docuFileRepositoryMock.instance(),
            instance(folderFinderMock),
        );
        const docuFile = await getDocuFilesInFolder.run({
            parentFolderId: folderPrimitive.id
         });

        expect(docuFile).toEqual(docuFilesPrimitive.map(DocuFile.fromPrimitives));
    });

    test(`
        GIVEN a deleted folder
        WHEN I get the docuFiles of the deleted folder
        THEN throw "FolderNotFound" exception
    `, async () => {
        const folderPrimitive = FolderPrimitiveMother.from({
            isDeleted: true,
        });

        when(folderFinderMock.run(deepEqual(new Id(folderPrimitive.id))))
            .thenResolve(Folder.fromPrimitives(folderPrimitive));

        const getDocuFilesInFolder = new GetDocuFilesInFolder(
            docuFileRepositoryMock.instance(),
            instance(folderFinderMock),
        );

        await expectToThrow(
            getDocuFilesInFolder.run({
                parentFolderId: folderPrimitive.id
            }),
            FolderNotFound
        )
    });

    test(`
        GIVEN an existing docuFiles in root folder
        WHEN I get the docuFiles with parent folder null
        AND mimeType filter
        THEN return the docuFiles in root folder with the specified mimeType
    `, async () => {
        const docuFilesPrimitivePDF = DocuFilePrimitiveMother.generateWith({
            parentFolderId: null,
            mimeType: 'application/pdf',
        });

        when(docuFileRepositoryMock.mockito.getAll(deepEqual({
            parentFolderId: Option.none(),
            filters: Option.some(DocuFileFilters.fromPrimitives({
                mimeType: 'pdf'
            }))
        }))).thenResolve(docuFilesPrimitivePDF.map(DocuFile.fromPrimitives));

        const getDocuFilesInFolder = new GetDocuFilesInFolder(
            docuFileRepositoryMock.instance(),
            instance(folderFinderMock),
        );
        const docuFiles = await getDocuFilesInFolder.run({
            parentFolderId: null,
            filters: {
                mimeType: "pdf"
            }
        });

        expect(docuFiles).toEqual(docuFilesPrimitivePDF.map(DocuFile.fromPrimitives));
    });
})