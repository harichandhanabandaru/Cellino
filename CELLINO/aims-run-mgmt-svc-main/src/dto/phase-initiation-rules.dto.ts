import { ApiProperty } from "@nestjs/swagger";

export class PhaseInitiationRules{
    @ApiProperty()
    key:string;
    @ApiProperty()
    value:string|number;
    @ApiProperty()
    operator:string;
}