import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { GetTagRequest } from "../../dto/get-tag-request.dto";
import { PageInfo } from "../../dto/page-info.dto";
import { TagDTO } from "../../dto/tag.dto";
import { TagsPaginatedResponse } from "../../dto/tags-paginated-response.dto";
import { Tag } from "../../entities/tag.entity";
import { FindOptionsWhere, Repository, In } from "typeorm";
import { CreateTagRequestDTO } from "../../dto/create-tag-request.dto";
import { UserInfo } from "../../utils/user-info";
import { randomUUID } from "crypto";

@Injectable()
export class TagService {
  private readonly DEFAULT_SIZE: number = 20;
  private readonly DEFAULT_PAGE: number = 1;
  private readonly MAX_SIZE = 200;

  constructor(
    @InjectRepository(Tag) private readonly tagRepository: Repository<Tag>,
    private readonly userInfo: UserInfo
  ) {}

  async getAll(request: GetTagRequest) {
    const { names, isActive, page, size } = request;
    const limit = Math.min(
      size && size > 0 ? size : this.DEFAULT_SIZE,
      this.MAX_SIZE
    );
    const pageNo = page && page > 0 ? page : this.DEFAULT_PAGE;
    const offset = (pageNo - 1) * limit;
    const whereClause: FindOptionsWhere<Tag> = {};
    whereClause.isActive = isActive;
    if (names) {
      whereClause.name = In(names);
    }
    const [response, count] = await this.tagRepository.findAndCount({
      where: whereClause,
      skip: offset,
      take: limit,
    });

    const paginatedResponse = new TagsPaginatedResponse();
    paginatedResponse.content = response.map((tag) => new TagDTO(tag));
    const pageInfo = new PageInfo();
    pageInfo.page = pageNo;
    pageInfo.size = response.length;
    pageInfo.totalElements = count;
    paginatedResponse.pageInfo = pageInfo;
    return paginatedResponse;
  }

  async createTag(request: CreateTagRequestDTO, userProfile: string) {
    const userId = this.userInfo.getUserId(userProfile);
    const tag = new Tag();
    tag.name = request.name;
    tag.createdAt = new Date();
    tag.createdBy = userId;
    tag.modifiedAt = new Date();
    tag.modifiedBy = userId;
    tag.id = randomUUID();
    const response = await this.tagRepository.insert(tag);
    const savedTag = await this.tagRepository.findOneOrFail({
      where: { id: response?.raw?.[0]?.id },
    });
    return new TagDTO(savedTag);
  }
}
