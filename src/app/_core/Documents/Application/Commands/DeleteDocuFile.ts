import { Id } from "../../../Shared/Domain/VOs/Id";
import { DocuFileDeleter } from "../../Domain/Services/DocuFileDeleter";
import { DocuFileFinder } from "../../Domain/Services/DocuFileFinder"

export class DeleteDocuFile {

    constructor(
        private docuFileFinder: DocuFileFinder,
        private docuFileDeleter: DocuFileDeleter,
    ) {}

    public async run({ id }: { id: string}): Promise<void> {
        const docuFile = await this.docuFileFinder.run(new Id(id))
        
        docuFile.unlinkFromParent()
        
        await this.docuFileDeleter.run(docuFile)
    }
}