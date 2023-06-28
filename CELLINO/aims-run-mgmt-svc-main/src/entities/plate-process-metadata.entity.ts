import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

export class ProcessMetadata {
    @ApiPropertyOptional()
    downSelectionDay:number;
}
