import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { isUUID } from "class-validator";
import { PhaseDto } from "../../dto/phase-dto.dto";
import { Phase } from "../../entities/phase.entity";
import { Repository } from "typeorm";

@Injectable()
export class PhaseService {
  constructor(
    @InjectRepository(Phase)
    private readonly phaseRepository: Repository<Phase>
  ) {}

  async getAllPhases(): Promise<PhaseDto[]> {
    const list: PhaseDto[] = [];
    const response = await this.phaseRepository.find({
      relations: { phaseToProtocol: true },
    });
    response?.forEach((phase) => {
      list.push(this.convertEntityToDTO(phase));
    });
    return list;
  }
  async getPhaseById(id: string): Promise<PhaseDto> {
    if (isUUID(id, "all")) {
      const response = await this.phaseRepository.findOne({
        where: { id: id },
        relations: { phaseToProtocol: true },
      });
      if (response) return this.convertEntityToDTO(response);
      else throw new NotFoundException(`The provided Id ${id} is not found`);
    } else
      throw new BadRequestException(`Phase id provided ${id} is not an uuid`);
  }

  convertEntityToDTO(phase: Phase): PhaseDto {
    const phaseDTO = new PhaseDto();
    phaseDTO.id = phase.id;
    phaseDTO.name = phase.name;
    phaseDTO.order = phase.order;
    phaseDTO.version = phase.version;
    phaseDTO.phaseInitiationRules = phase.phaseInitiationRules;
    phaseDTO.otherRules = phase.otherRules;
    const protcolIdsList: string[] = [];
    phase.phaseToProtocol.forEach((ele) => {
      protcolIdsList.push(ele.protocol.id);
    });
    phaseDTO.protocols = protcolIdsList;
    return phaseDTO;
  }
}
