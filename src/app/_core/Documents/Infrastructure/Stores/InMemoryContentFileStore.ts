import { ContentFile } from "../../Domain/Entities/ContentFile";
import { ContentFileStore } from "../../Domain/Repositories/ContentFileStore";
import { join } from "path";
import { unlink, writeFile } from "fs/promises";
import { DocuFile } from "../../Domain/Entities/DocuFile";

export class InMemoryContentFileStore implements ContentFileStore {
   
    async upload(contentFile: ContentFile): Promise<{ file: ContentFile, url: string }> {
        const path = join('docs', `${contentFile.id.value}.${contentFile.extension}`);

        const pathToUpload = join(process.cwd(), path);
        const bytes = await contentFile.content.arrayBuffer();
        const buffer = Buffer.from(bytes);
        await writeFile(pathToUpload, buffer);

        return {
            file: contentFile,
            url: `${process.env.NEXT_PUBLIC_STATIC_SERVER_URL!}/${path}`
        };
    }

    async delete(docuFile: DocuFile): Promise<void> {
        const path = join('docs', `${docuFile.id.value}.${docuFile.extension}`);

        const pathToDelete = join(process.cwd(), path);
        await unlink(pathToDelete);
    }
}