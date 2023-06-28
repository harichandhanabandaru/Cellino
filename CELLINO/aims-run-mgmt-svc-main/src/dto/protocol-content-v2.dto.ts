import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsUUID } from "class-validator";
import { Protocol } from "../entities/protocol.entity";

export class ProtocolResponseContentV2Dto {
  @ApiProperty({ description: "Protocol Id" })
  id: string;

  @ApiProperty({ description: "name of the protocol" })
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    description: "ProtocolDefintion from which the given protocol is derived",
  })
  @IsUUID()
  @IsNotEmpty()
  protocolDefintionId: string;

  @ApiProperty({ type: Object, description: "Settings of the protocol" })
  @IsNotEmpty()
  settings: Object;

  constructor(protocol: Protocol) {
    this.id = protocol.id;
    this.name = protocol.name;
    this.settings = protocol.settings;
    this.protocolDefintionId = protocol.protocolDefinition
      ? protocol.protocolDefinition.id
      : null;
  }
}
