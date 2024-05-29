import { DocuFileRepository } from "../../Domain/Repositories/DocuFileRepository"
import { DocuFile } from "../../Domain/Entities/DocuFile"
import { DocuFileFiltersPrimitives } from "../../Domain/Primitives/DocuFileFiltersPrimitives"
import { Option } from "../../../Shared/Domain/VOs/Option"
import { DocuFileFilters } from "../../Domain/VOs/DocuFileFilters"

export class GetDocuFiles {

    constructor(
        private docuFileRepository: DocuFileRepository,
    ) {}

    public async run({ filters }: { filters?: DocuFileFiltersPrimitives }): Promise<DocuFile[]> {
        return this.docuFileRepository.getAll({
            filters: filters ? Option.some(DocuFileFilters.fromPrimitives(filters)) : Option.none()
        })
    }
}