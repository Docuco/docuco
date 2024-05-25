import { ContentFile } from "../../Domain/Entities/ContentFile";
import { ContentFileStore } from "../../Domain/Repositories/ContentFileStore";
import { DocuFile } from "../../Domain/Entities/DocuFile";
import { DeleteObjectCommand, PutObjectCommand, S3Client } from "@aws-sdk/client-s3";

export class S3ContentFileStore implements ContentFileStore {

    private s3Client: S3Client;

    constructor() {
        this.s3Client = new S3Client({
            region: process.env.AWS_REGION!,
            credentials: {
                accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
                secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
            },
            endpoint: process.env.NODE_ENV === 'development' ? 'http://docuco_s3_storage:4566' : undefined,
            forcePathStyle: process.env.NODE_ENV === 'development',
        });
    }

    async upload(contentFile: ContentFile): Promise<{ file: ContentFile, url: string }> {
        const arrayBuffer = await contentFile.content.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);
        const putObjectCommand = new PutObjectCommand({
            Bucket: process.env.AWS_BUCKET!,
            Key: contentFile.fullname,
            Body: buffer,
            ContentType: contentFile.mimeType,
        });
        await this.s3Client.send(putObjectCommand);
        
        return {
            file: contentFile,
            url: process.env.NODE_ENV === 'development'
                ? `http://localhost:4566/${process.env.AWS_BUCKET}/${contentFile.fullname}`
                : `https://${process.env.AWS_BUCKET}.s3.${process.env.AWS_REGION}.amazonaws.com/${contentFile.fullname}`
        };
    }

    async delete(docuFile: DocuFile): Promise<void> {
        const putObjectCommand = new DeleteObjectCommand({
            Bucket: process.env.AWS_BUCKET!,
            Key: docuFile.fullname,
        });

        await this.s3Client.send(putObjectCommand);
    }
}