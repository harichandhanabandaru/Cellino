import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsUUID } from "class-validator";

export class CreateProtocolRequestDTO {
  @ApiProperty({description:"name of the protocol"})
  @IsNotEmpty()
  name: string;

  @ApiProperty({description:"ProtocolDefintion from which the given protocol is derived"})
  @IsUUID()
  @IsNotEmpty()
  protocolDefintionId: string;

  @ApiProperty({type: Object, description:"Settings of the protocol"})
  @IsNotEmpty()
  settings: Object;
}
