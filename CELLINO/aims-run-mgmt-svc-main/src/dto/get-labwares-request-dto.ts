import { ApiPropertyOptional } from "@nestjs/swagger";
import { IsOptional } from "class-validator";
import { PaginationDTO } from "./pagination.dto";

export class GetLabwaresRequestDTO extends PaginationDTO {
    @ApiPropertyOptional({ description: "Labware name", type: String })
    @IsOptional()
    name: string;
    @ApiPropertyOptional({ description: "Partial Labware name", type: String })
    @IsOptional()
    nameLike: string;
}
