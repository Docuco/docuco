import { DocuFile } from "../../Domain/Entities/DocuFile"
import { DocuFileFinder } from "../../Domain/Services/DocuFileFinder"

export class GetDocuFile {

    constructor(
        private docuFileFinder: DocuFileFinder,
    ) {}

    public async run({id}: {id: string}): Promise<DocuFile> {
        return this.docuFileFinder.run(id)
    }
}