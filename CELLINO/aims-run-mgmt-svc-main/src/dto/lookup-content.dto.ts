import { ApiProperty } from "@nestjs/swagger";
import { ProtocolType } from "../entities/protocol-type.entity";
import { CreateLookUpDataDTO } from "./create-lookup-data.dto";

export class LookUpContentDTO extends CreateLookUpDataDTO {
    
    @ApiProperty({type:"uuid", description:'id of the protocol Category'})
    id: string;

    constructor(protocolType: ProtocolType) {
        super();
        this.id = protocolType.id;
        this.code = protocolType?.code;
        this.label = protocolType?.label;
        this.description = protocolType?.description;
      }
}