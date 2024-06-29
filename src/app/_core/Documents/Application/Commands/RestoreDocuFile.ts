import { Id } from "../../../Shared/Domain/VOs/Id";
import { DocuFileFinder } from "../../Domain/Services/DocuFileFinder"
import { DocuFileRestorer } from "../../Domain/Services/DocuFileRestorer";

export class RestoreDocuFile {

    constructor(
        private docuFileFinder: DocuFileFinder,
        private docuFileRestorer: DocuFileRestorer,
    ) {}

    public async run({ id }: { id: string }): Promise<void> {
        const docuFile = await this.docuFileFinder.run(new Id(id))
        
        docuFile.unlinkFromParent()
        
        await this.docuFileRestorer.run(docuFile)
    }
}