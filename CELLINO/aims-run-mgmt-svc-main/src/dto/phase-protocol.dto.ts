import { ApiPropertyOptional } from "@nestjs/swagger";
import { IsUUID } from "class-validator";

export class PhaseProtocolDTO {

    @ApiPropertyOptional({ description: "Phase ID" })
    @IsUUID('all')
    phaseId: string;

    @ApiPropertyOptional({ description: "Preceding Protocol ID" })
    @IsUUID('all')
    precedingProtocolId: string;

    constructor(phaseId: string, precedingProtocolId: string) {
        this.phaseId = phaseId || null;
        this.precedingProtocolId = precedingProtocolId || null;
    }
}