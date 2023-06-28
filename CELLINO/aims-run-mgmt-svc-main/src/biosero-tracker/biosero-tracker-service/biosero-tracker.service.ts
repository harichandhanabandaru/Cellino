import {Injectable} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {BioseroTrackerDto} from "src/dto/biosero-tracker.dto";
import {BioseroTracker} from "src/entities/biosero-tracker.entity";
import {UserInfo} from "src/utils/UserInfo";
import {FindOptionsWhere, Repository} from "typeorm";

@Injectable()
export class BioseroTrackerService {
  constructor(
    @InjectRepository(BioseroTracker)
    private readonly bioseroTrackerRepository: Repository<BioseroTracker>,
    private readonly userInfo: UserInfo
  ) {}

  convertBioseroTrackerToBioseroTrackerDTO(bioseroTracker: BioseroTracker) {
    const bioseroTrackerDTO = new BioseroTrackerDto();
    bioseroTrackerDTO.id = bioseroTracker.id
    bioseroTrackerDTO.type = bioseroTracker.type
    bioseroTrackerDTO.topic = bioseroTracker.topic
    bioseroTrackerDTO.endTime = bioseroTracker.endTime
    return bioseroTrackerDTO
  }

  async getLatestBioseroTrackerByType(type: string, topic: string) {
    let whereClause: FindOptionsWhere<BioseroTracker> = {}
    if (type) {
      whereClause.type = type
    }
    if (topic) {
      whereClause.topic = topic
    }
    const bioseroTrackers: BioseroTracker[] = await this.bioseroTrackerRepository.find({
      where: whereClause,
      order: {endTime: 'DESC'},
      take: 1
    })
    const bioseroTrackerDTOs = []
    bioseroTrackers.forEach((event) => {
      bioseroTrackerDTOs.push(this.convertBioseroTrackerToBioseroTrackerDTO(event))
    })
    if (bioseroTrackerDTOs.length > 0){
      return bioseroTrackerDTOs[0]
    }
    return null;
  }

  async saveBioseroTrackerEvents(bioseroTrackerDTO: BioseroTrackerDto, type: string, userProfile: string){
    const userId = this.userInfo.getUserId(userProfile)
    const bioseroTracker: BioseroTracker = await this.convertBioseroTrackerDTOToBioseroTrackerEntity(bioseroTrackerDTO, type, userId);
    const savedBioseroTracker: BioseroTracker = await this.bioseroTrackerRepository.save(bioseroTracker)
    return this.convertBioseroTrackerToBioseroTrackerDTO(savedBioseroTracker);
  }

  async convertBioseroTrackerDTOToBioseroTrackerEntity(bioseroTrackerDTO: BioseroTrackerDto, type:string, userID: string){
    const bioseroTrackers: BioseroTracker[] = await this.bioseroTrackerRepository.find({where: {type: bioseroTrackerDTO.type}})
    let existingBioseroTracker: BioseroTracker
    if (bioseroTrackers.length > 0) {
      existingBioseroTracker = bioseroTrackers[0]
    }
    else {
      existingBioseroTracker = new BioseroTracker();
    }
    existingBioseroTracker.type = bioseroTrackerDTO.type
    existingBioseroTracker.topic = bioseroTrackerDTO.topic
    existingBioseroTracker.endTime = bioseroTrackerDTO.endTime
    existingBioseroTracker.createdAt = new Date()
    existingBioseroTracker.createdBy = userID
    existingBioseroTracker.modifiedAt = new Date()
    existingBioseroTracker.modifiedBy = userID
    return existingBioseroTracker;
  }
}