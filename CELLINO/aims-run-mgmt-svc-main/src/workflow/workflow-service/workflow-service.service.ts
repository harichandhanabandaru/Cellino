import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { isUUID } from "class-validator";
import { Workflow } from "../../entities/workflow.entity";
import { Repository } from "typeorm";

@Injectable()
export class WorkflowService {
  static BAD_REQUEST_ERROR_MESSAGE: string =
    "The provided Workflow ID is not UUID";
  static NOT_FOUND_ERROR_MESSAGE: string =
    "The provided Workflow ID is not found";

  constructor(
    @InjectRepository(Workflow)
    private readonly workflowRepository: Repository<Workflow>
  ) {}

  /**
   *  Fetches data based on ID from the database.
   */
  async getById(id: string): Promise<Workflow> {
    //let workFlowDto: WorkflowDto;
    // Check if it is a valid UUID.
    if (!isUUID(id)) {
      throw new BadRequestException(WorkflowService.BAD_REQUEST_ERROR_MESSAGE);
    }

    let workflow: Workflow = await this.workflowRepository.findOne({
      where: { id: id },
      relations: { workflowToPhase: true, runs: true },
    });
    // Check if the data is is recieved or undefined.
    if (!workflow) {
      throw new NotFoundException(WorkflowService.NOT_FOUND_ERROR_MESSAGE);
    }

    // Return the workflow object.
    return workflow;
  }
}
