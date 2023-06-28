import { ApiProperty } from "@nestjs/swagger";
import { LabwareDTO } from "./labware.dto";
import { PageInfo } from "./page-info.dto";

export class GetLabwaresResponseDTO {
    @ApiProperty({ type: [LabwareDTO] })
    content: LabwareDTO[];
    @ApiProperty({ type: PageInfo })
    pageInfo: PageInfo;
    constructor(content: LabwareDTO[], pageInfo: PageInfo) {
        this.content = content;
        this.pageInfo = pageInfo;
    }
}
