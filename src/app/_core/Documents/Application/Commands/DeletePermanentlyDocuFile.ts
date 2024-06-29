import { DocuFileFinder } from "../../Domain/Services/DocuFileFinder"
import { Id } from "../../../Shared/Domain/VOs/Id";
import { DocuFileDeleterPermanently } from "../../Domain/Services/DocuFileDeleterPermanently";

export class DeletePermanentlyDocuFile {

    constructor(
        private docuFileFinder: DocuFileFinder,
        private docuFileDeleterPermanently: DocuFileDeleterPermanently,
    ) {}

    public async run({ id }: { id: string }): Promise<void> {
        const docuFile = await this.docuFileFinder.run(new Id(id))
        
        await this.docuFileDeleterPermanently.run(docuFile)
    }
}