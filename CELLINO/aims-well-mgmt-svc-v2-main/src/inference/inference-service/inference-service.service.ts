import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Inference } from "../../entities/inference.entity";
import { EntityNotFoundError, FindOptionsWhere, Repository } from "typeorm";
import { ImageEvent } from "../../entities/image-event.entity";
import { InferenceDTO } from "../../dto/inference.dto";
import { CreateInferenceRequest } from "../../dto/create-inference.dto";
import { GetInferenceRequestDTO } from "../../dto/get-inference-request.dto";
import { ImageSetting } from "../../entities/image-setting.entity";
import { ImageAnalysisRequest } from "../../entities/image-analysis-request.entity";
import { UserInfo } from "../../utils/user-info";
import { randomUUID } from "crypto";
import { applyPatch, Operation } from "fast-json-patch";
import { isUUID } from "class-validator";

@Injectable()
export class InferenceService {
  constructor(
    @InjectRepository(Inference)
    private readonly inferenceRepository: Repository<Inference>,
    @InjectRepository(ImageEvent)
    private readonly imageEventRepository: Repository<ImageEvent>,
    @InjectRepository(ImageSetting)
    private readonly imageSettingRepository: Repository<ImageSetting>,
    @InjectRepository(ImageAnalysisRequest)
    private readonly imageAnalysisRepository: Repository<ImageAnalysisRequest>,
    private readonly userService: UserInfo
  ) {}

  async getInferences(filters?: GetInferenceRequestDTO) {
    const whereClause: FindOptionsWhere<Inference> = {};
    const whereImageEventClause: FindOptionsWhere<ImageEvent> = {};
    const whereAnalysisRequestClause: FindOptionsWhere<ImageAnalysisRequest> =
      {};
    if (filters?.imageEventId) {
      whereImageEventClause.id = filters?.imageEventId;
      whereClause.imageEvent = whereImageEventClause;
    }

    if (filters?.imageAnalysisRequestId) {
      whereAnalysisRequestClause.id = filters?.imageAnalysisRequestId;
      whereClause.imageAnalysisRequest = whereAnalysisRequestClause;
    }

    const inferences: Inference[] = await this.inferenceRepository.find({
      where: whereClause,
      relations: {
        imageEvent: true,
        imageAnalysisRequest: true,
        imageSetting: true,
      },
    });
    return inferences.map((inference) => new InferenceDTO(inference));
  }

  async create(reqBody: CreateInferenceRequest, userProfile: string) {
    const newEntity = new Inference();

    newEntity.id = randomUUID();

    newEntity.name = reqBody.name;
    newEntity.artifactPath = reqBody.artifactPath;
    newEntity.metadata = reqBody.metadata;
    newEntity.protocolId = reqBody.protocolId;

    if (reqBody.imageEventId) {
      const imageEvent = await this.imageEventRepository.findOne({
        where: { id: reqBody.imageEventId },
      });
      if (!imageEvent)
        throw new NotFoundException(
          `Image Event not found ${reqBody.imageEventId}`
        );
      newEntity.imageEvent = imageEvent;
    }
    if (reqBody.imageAnalysisRequestId) {
      const imageAnalysisReq = await this.imageAnalysisRepository.findOne({
        where: { id: reqBody.imageAnalysisRequestId },
      });
      if (!imageAnalysisReq)
        throw new NotFoundException(
          `Image Analysis not found ${reqBody.imageAnalysisRequestId}`
        );
      newEntity.imageAnalysisRequest = imageAnalysisReq;
    }
    if (reqBody.imageSettingId) {
      const imageSetting = await this.imageSettingRepository.findOne({
        where: { id: reqBody.imageSettingId },
      });
      if (!imageSetting)
        throw new NotFoundException(
          `Image Event not found ${reqBody.imageSettingId}`
        );
      newEntity.imageSetting = imageSetting;
    }

    const userId = this.userService.getUserId(userProfile);

    newEntity.createdAt = new Date();
    newEntity.createdBy = userId;
    newEntity.modifiedAt = new Date();
    newEntity.modifiedBy = userId;

    const savedEntity = await this.inferenceRepository.save(newEntity);
    return new InferenceDTO(savedEntity);
  }

  async update(id: string, patchOps: Operation[], userProfile: string) {
    if (!isUUID(id)) {
      throw new BadRequestException("id is not UUID");
    }

    const oldInference = await this.inferenceRepository.findOne({
      where: { id: id },
    });

    if (!oldInference) {
      throw new NotFoundException(`Inference with ${id} does not exists`);
    }

    let userId = this.userService.getUserId(userProfile);
    let patchedInference = applyPatch(oldInference, patchOps).newDocument;

    patchedInference.modifiedBy = userId;
    patchedInference.modifiedAt = new Date();

    const savedInference = await this.inferenceRepository.save(
      patchedInference
    );
    return new InferenceDTO(savedInference);
  }

  async getInferenceById(id: string) {
    try {
      const inference = await this.inferenceRepository.findOneOrFail({
        where: { id },
      });
      return inference;
    } catch (e) {
      if (e instanceof EntityNotFoundError) {
        throw new NotFoundException(e.message);
      }
      throw new InternalServerErrorException(e.message);
    }
  }
}
