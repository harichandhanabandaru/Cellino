import { ApiProperty } from "@nestjs/swagger";
import { Protocol } from "../entities/protocol.entity";
import { CreateProtocolRequestDTO } from "./create-protocol-request.dto";
import { PhaseProtocolDTO } from "./phase-protocol.dto";

export class ProtocolContentDTO extends CreateProtocolRequestDTO {
  @ApiProperty({ description: "Protocol Id" })
  id: string;

  @ApiProperty({
    description:
      "List of phases and preceding protocols associated with the current Phase Resources",
  })
  phaseProtocol: PhaseProtocolDTO[];

  constructor(protocol: Protocol) {
    super();
    this.id = protocol.id;
    this.name = protocol.name;
    this.settings = protocol.settings;

    this.protocolDefintionId = protocol.protocolDefinition
      ? protocol.protocolDefinition.id
      : null;

    this.phaseProtocol = protocol.phaseProtocol
      ? protocol.phaseProtocol.map(
          (ele) =>
            new PhaseProtocolDTO(ele.phase?.id, ele.precedingProtocol?.id)
        )
      : [];
  }
}
