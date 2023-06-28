import { Injectable } from "@nestjs/common";
import { PageInfo } from "../../dto/page-info.dto";
import {
  PlateReviewerDTO,
  PlateReviewerPaginatedDTO,
  PlateDetails,
} from "../../dto/plate-reviewer-by-reviewer.dto";
import { StatusMessage } from "../../dto/status-message.dto";
import { PlateReviewer } from "../../entities/plate-reviewer.entity";
import { PlateService } from "../../plate/plate-service/plate-service.service";
import { PlateRepository } from "../../repository/plate.repository";
import { Pagination } from "../../utils/pagination";
import { PlateReviewerRepository } from "../../repository/plate-reviewer.repository";
import { GetPlateReviewerBodyDTO } from "../../dto/get-plate-reviewer.dto";

@Injectable()
export class PlateReviewerService {
  constructor(
    private readonly plateReviewerRepository: PlateReviewerRepository,
    private readonly plateRepository: PlateRepository
  ) {}

  static MAX_SIZE: number = 100;

  async getPlatesReviewers(
    pagination: Pagination = {
      size: PlateService.DEFAULT_SIZE,
      page: PlateService.DEFAULT_PAGE,
    }
  ) {
    const {
      size = PlateService.DEFAULT_SIZE,
      page = PlateService.DEFAULT_PAGE,
    } = pagination;

    let limit = size ? size : PlateService.DEFAULT_PAGE;
    limit = Math.min(size, PlateReviewerService.MAX_SIZE);
    const pageId = page ? page : 1;
    const offset = page ? (page - 1) * size : 0;

    const [result, count] =
      await this.plateReviewerRepository.findAllPlatesGroupByUserAndCount({
        plateRepository: this.plateRepository,
        limit,
        offset,
      });

    const response: PlateReviewerDTO[] = [];
    const paginatedResponse: PlateReviewerPaginatedDTO =
      new PlateReviewerPaginatedDTO();

    result.forEach(async (ele) => {
      const dto = new PlateReviewerDTO();
      dto.userId = ele["user_id"];
      dto.plate = ele["plates"].map((ele) => new PlateDetails(ele));
      response.push(dto);
    });

    paginatedResponse.content = response;
    const pageInfo: PageInfo = new PageInfo();
    pageInfo.page = pageId;
    pageInfo.size = result.length;
    pageInfo.totalElements = count;
    paginatedResponse.pageInfo = pageInfo;

    return paginatedResponse;
  }

  async assignPlateToReviewer(
    listOfAssignees: GetPlateReviewerBodyDTO[],
  ): Promise<StatusMessage> {
    await Promise.all(
      listOfAssignees.map((assignee) => {
        const newPlateReviewer = new PlateReviewer();
        assignee.plateIds.forEach(async (plateId) => {
          newPlateReviewer.plateId = plateId;
          newPlateReviewer.userId = assignee.userId;
          await this.plateReviewerRepository.save(newPlateReviewer);
        });
      })
    );

    return new StatusMessage("Added record(s)", "Success");
  }

  async unassignPlateToReviewer(
    listOfUnassignees: GetPlateReviewerBodyDTO[],
  ): Promise<StatusMessage> {
    await Promise.all(
      listOfUnassignees.map((unassignee) => {
        unassignee.plateIds.forEach(async (plateId) => {
          const plateReviewer = await this.plateReviewerRepository.findOne({
            where: {
              plate: { id: plateId },
              userId: unassignee.userId,
            },
          });

          if (plateReviewer) {
            return this.plateReviewerRepository.remove(plateReviewer);
          }
        });
      })
    );

    return new StatusMessage("Removed record", "Success");
  }
}
