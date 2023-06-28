import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { isUUID } from "class-validator";
import { Labware } from "../../entities/labware.entity";
import { FindOptionsWhere, Repository, ILike } from "typeorm";
import { LabwareDTO } from "../../dto/labware.dto";
import { GetLabwaresRequestDTO } from "../../dto/get-labwares-request-dto";
import { PageInfo } from "../../dto/page-info.dto";
import { GetLabwaresResponseDTO } from "../../dto/get-labwares-response-dto";

@Injectable()
export class LabwareService {
  static BAD_REQUEST_ERROR_MESSAGE: string =
    "The provided Labware ID is not UUID";
  static NOT_FOUND_ERROR_MESSAGE: string =
    "The provided Labware ID is not found";
  private readonly DEFAULT_SIZE: number = 20;
  private readonly DEFAULT_PAGE: number = 1;
  private readonly MAX_SIZE = 200;
  constructor(
    @InjectRepository(Labware)
    private readonly labwareRepository: Repository<Labware>
  ) {}

  /**
   *  Fetches data based on ID from the database.
   */
  async getById(id: string): Promise<LabwareDTO> {
    // Check if it is a valid UUID.
    if (!isUUID(id)) {
      throw new BadRequestException(LabwareService.BAD_REQUEST_ERROR_MESSAGE);
    }

    const labware: Labware = await this.labwareRepository.findOne({
      where: { id: id },
      loadRelationIds: true,
    });
    // Check if the data is is recieved or undefined.
    if (!labware) {
      throw new NotFoundException(LabwareService.NOT_FOUND_ERROR_MESSAGE);
    }

    // Return the workflow object.
    return new LabwareDTO(labware);
  }

  async getAll(request: GetLabwaresRequestDTO): Promise<GetLabwaresResponseDTO> {
    const { name, nameLike, size } = request;
    const limit = Math.min(size && size > 0 ? size : this.DEFAULT_SIZE, this.MAX_SIZE);
    const page = request.page && request.page > 0 ? request.page : this.DEFAULT_PAGE;
    const offset = (page - 1) * limit;
    let whereClause: FindOptionsWhere<Labware> = {};
    let labwares: Array<LabwareDTO> = [];
    if (name) {
      whereClause.name = name;
    }
    else if (nameLike) {
      whereClause.name = ILike(`%${nameLike}%`);
    }
    const [response, count] = await this.labwareRepository.findAndCount({
      where: whereClause,
      skip: offset,
      take: limit,
      loadRelationIds: {
        relations: ["vendor","manufacturer"],
        disableMixedMap: true,
        },
    })
    response.map((labware: Labware) => {
      labwares.push(new LabwareDTO(labware));
    })
    const pageInfo = new PageInfo();
    pageInfo.page = page;
    pageInfo.size = labwares?.length;
    pageInfo.totalElements = count;
    return new GetLabwaresResponseDTO(labwares, pageInfo);
  }
}
