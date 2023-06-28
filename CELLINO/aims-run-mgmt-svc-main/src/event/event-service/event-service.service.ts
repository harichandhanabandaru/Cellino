import {
  BadRequestException,
  ConflictException,
  Injectable,
  Logger,
  NotFoundException,
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { EventType } from "../../enums/EventType";
import { FindOptionsWhere, Repository, Raw } from "typeorm";
import { Event } from "../../entities/event.entity";
import { CreateEventDTO } from "../../dto/create-event-dto";
import { Protocol } from "../../entities/protocol.entity";
import { Plate } from "../../entities/plate.entity";
import { EventDTO } from "../../dto/event.dto";
import { UserInfo } from "../../utils/UserInfo";
import { applyPatch, deepClone, Operation } from "fast-json-patch";
import { getEnumIndex } from "../../utils/getEnumIndex";
import { ReviewStatus } from "../../enums/ReviewStatus";
import { ProcessStatus } from "../../enums/ProcessStatus";
import { AnalysisStatus } from "../../enums/AnalysisStatus";

/**
 * Interface for data which can be used for filtering.
 */
export interface EventFilter {
  plateId?: string;
  eventType?: EventType;
  bioseroMasterOrderId?: string;
}

/**
 * This is a service class for Event Resource.
 */
@Injectable()
export class EventService {
  static DEFAULT_SIZE: number = 20;
  static DEFAULT_PAGE: number = 0;
  private logger = new Logger(EventService.name);

  constructor(
    @InjectRepository(Event)
    private readonly eventRepository: Repository<Event>,

    @InjectRepository(Protocol)
    private readonly protocolRepository: Repository<Protocol>,

    @InjectRepository(Plate)
    private readonly plateRepository: Repository<Plate>,

    private readonly userInfo: UserInfo
  ) {}

  /**
   * This method fetches all events data.
   *
   * It also provides filtering options based on `EventFilter`
   * By default, only gives 20 records at a time, unless pagination details are provided.
   *
   * @param filters Allows to filter based filter options.
   * @param pagination Allows to paginate the results
   * @returns Events[]
   */
  async getAll(filters?: EventFilter): Promise<Array<EventDTO>> {
    let whereClause: FindOptionsWhere<Event> = {};

    if (filters?.plateId) {
      whereClause.plate = {
        id: filters.plateId,
      };
    }

    if (filters?.eventType) {
      whereClause.eventType =
        EventType[filters.eventType as unknown as keyof typeof EventType];
    }

    if (filters?.bioseroMasterOrderId) {
      whereClause.metadata = Raw(
        () =>
          `metadata::jsonb @> '${JSON.stringify({
            biosero_master_order_id: filters.bioseroMasterOrderId,
          })}'::jsonb`
      );
    }

    const events = await this.eventRepository.find({
      where: whereClause,
      relations: { plate: true, protocol: true },
      order: {
        startedAt: "ASC",
        createdAt: "ASC",
      },
    });

    return events.map((event) => new EventDTO(event));
  }

  /* 
  Registers an event to event table 
  */
  async addEvent(
    eventRequest: CreateEventDTO,
    userProfile: string
  ): Promise<EventDTO> {
    const event = new Event();
    event.id = eventRequest?.id;
    event.name = eventRequest.name;
    //convert enums to integer
    if (eventRequest?.eventType) {
      event.eventType = EventType[
        eventRequest.eventType
      ] as unknown as EventType;
    }

    if (eventRequest?.analysisStatus) {
      event.analysisStatus = AnalysisStatus[
        eventRequest.analysisStatus
      ] as unknown as AnalysisStatus;
    }

    event.metadata = eventRequest?.metadata;
    let protocol = null;
    if (eventRequest?.protocol?.id) {
      protocol = await this.protocolRepository.findOne({
        where: { id: eventRequest.protocol.id },
      });
      if (protocol) {
        event.protocol = protocol;
      }
    }
    if (protocol === null && eventRequest?.protocol?.name) {
      protocol = await this.protocolRepository.findOne({
        where: { name: eventRequest.protocol.name },
      });
      if (protocol) {
        event.protocol = protocol;
      } else {
        throw new NotFoundException(
          `The provided protocol details ${JSON.stringify(
            eventRequest.protocol
          )} are invalid`
        );
      }
    }
    let plate: Plate = null;
    if (eventRequest.plate?.id) {
      plate = await this.plateRepository.findOne({
        where: { id: eventRequest.plate.id },
      });
    }
    if (plate === null && eventRequest.plate?.barcode) {
      plate = await this.plateRepository.findOne({
        where: { barcode: eventRequest.plate.barcode },
      });
    }
    if (plate != null) {
      event.plate = plate;
    } else {
      throw new BadRequestException(
        `The Plate details ${eventRequest.plate} provided is invalid`
      );
    }
    event.createdAt = new Date();
    event.modifiedAt = new Date();
    event.startedAt = eventRequest.startedAt;
    const userId = this.userInfo.getUserId(userProfile);
    event.createdBy = userId;
    event.modifiedBy = userId;
    try {
      const entity = await this.eventRepository.insert(event);
      const savedEntity = await this.eventRepository.findOne({
        where: { id: entity.raw[0]?.id },
        relations: { plate: true, protocol: true },
      });
      return new EventDTO(savedEntity);
    } catch (e) {
      this.logger.error(`error while processing the request : ${e}`);
      throw new ConflictException(
        `Error while saving the Request : ${JSON.stringify(
          eventRequest,
          null,
          2
        )}`,
        `${e}`
      );
    }
  }

  async getEventById(id: string) {
    const event: Event = await this.eventRepository.findOne({
      where: { id: id },
      relations: { plate: true, protocol: true },
    });
    if (event) {
      return new EventDTO(event);
    } else {
      this.logger.error(`The provided event Id ${id} is not found`);
      throw new BadRequestException(`The provided event Id ${id} is not found`);
    }
  }

  async updateEvent(id: string, data: [Operation], userProfile: string) {
    const event = await this.eventRepository.findOne({
      where: { id: id },
      relations: { plate: true, protocol: true },
    });
    if (!event) {
      throw new NotFoundException(`The provided Event Id ${id} is not found`);
    }
    data.forEach((operation) => {
      if (operation.path === "/eventType")
        operation["value"] = getEnumIndex(operation["value"], EventType);
      if (operation.path === "/reviewStatus")
        operation["value"] = getEnumIndex(operation["value"], ReviewStatus);
      if (operation.path === "/processStatus")
        operation["value"] = getEnumIndex(operation["value"], ProcessStatus);
      if (operation.path === "/analysisStatus")
        operation["value"] = getEnumIndex(operation["value"], AnalysisStatus);
    });
    let result = applyPatch(event, deepClone(data));
    let patchedObject = result.newDocument;
    let userId = this.userInfo.getUserId(userProfile);
    if (userId) {
      patchedObject.modifiedBy = userId;
    }
    patchedObject.modifiedAt = new Date();
    let updatedEvent = await this.eventRepository.save(patchedObject);
    return new EventDTO(updatedEvent);
  }
}
