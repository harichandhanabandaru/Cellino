import { ApiProperty } from "@nestjs/swagger";
import { ProtocolDefinition } from "../entities/protocol-definition.entity";
import { CreateProtocolDefinitionDTO } from "./create-protocol-defintiion.dto";

export class ProtocolDefinitionContentDTO extends CreateProtocolDefinitionDTO {
  @ApiProperty()
  id: string;

  constructor(protocolDefinition: any) {
    super();
    this.id = protocolDefinition.id;
    this.name = protocolDefinition?.name;
    this.workflowTemplateName = protocolDefinition?.workflowTemplateName
      ? protocolDefinition.workflowTemplateName
      : protocolDefinition?.workflow_template_name;
    this.protocolCategory = protocolDefinition?.protocolCategory
      ? protocolDefinition.protocolCategory
      : protocolDefinition?.protocol_category_code;
    this.protocolType = protocolDefinition?.protocolType
      ? protocolDefinition.protocolType
      : protocolDefinition?.protocol_type_code;
    this.relatedId = protocolDefinition?.relatedId
      ? protocolDefinition?.relatedId
      : protocolDefinition?.related_id;
    this.parameters = protocolDefinition?.parameters;
  }
}
