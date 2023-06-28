import { Controller, Get, Param } from "@nestjs/common";
import {
  ApiBadRequestResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags,
} from "@nestjs/swagger";
import { WorkflowDTO } from "../../dto/workflow.dto";
import { WorkflowService } from "../workflow-service/workflow-service.service";

@ApiTags("Workflow")
@Controller({ path: "workflows", version: "1" })
export class WorkflowController {
  constructor(private readonly workflowService: WorkflowService) {}

  @Get(":id")
  @ApiOkResponse({ type: WorkflowDTO })
  @ApiBadRequestResponse({ description: "Bad Request: id is not UUID" })
  @ApiNotFoundResponse({ description: "The provided id is not found" })
  async getById(@Param("id") id: string): Promise<WorkflowDTO> {
    let workflow = await this.workflowService.getById(id);
    let workflowDTO = new WorkflowDTO(workflow);
    return Promise.resolve(workflowDTO);
  }
}
