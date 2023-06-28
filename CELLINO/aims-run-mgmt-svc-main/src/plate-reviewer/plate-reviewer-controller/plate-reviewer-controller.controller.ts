import { Body, Controller, Delete, Get, Post, Query } from '@nestjs/common';
import { ApiBadRequestResponse, ApiBody, ApiInternalServerErrorResponse, ApiOkResponse, ApiTags, getSchemaPath } from '@nestjs/swagger';
import { GetPlateReviewerBodyDTO } from '../../dto/get-plate-reviewer.dto';
import { PaginationDTO } from '../../dto/pagination.dto';
import { StatusMessage } from '../../dto/status-message.dto';
import { PlateReviewerService } from '../plate-reviewer-service/plate-reviewer-service.service';

@ApiTags("Plate Reviewers")
@Controller({ path: 'plate-reviewers', version: '1' })
export class PlateReviewerController {

    constructor(
        private readonly plateReviewerService: PlateReviewerService,
    ){}

    @Get()
    @ApiOkResponse({ description: "List of reviewers and their associated plates" })
    @ApiBadRequestResponse({ description: "Bad Request Exception"})
    @ApiInternalServerErrorResponse({ description: "Something went wrong!! Contact Administrator" })
    async getPlateOfOnlyReviewers(
      @Query() query: PaginationDTO
    ) {
      return this.plateReviewerService.getPlatesReviewers({ page: query?.page, size: query?.size });
    }
  
    @Post()
    @ApiOkResponse({description: "Status message saying if the records are added", type: StatusMessage, schema: {$ref: getSchemaPath(StatusMessage)}})
    @ApiBadRequestResponse({ description: "Bad Request Exception"})
    @ApiInternalServerErrorResponse({ description: "Something went wrong!! Contact Administrator" })
    @ApiBody({
      type: [GetPlateReviewerBodyDTO],
      schema: { $ref: getSchemaPath(GetPlateReviewerBodyDTO) },
      description: "List of objects which denotes which Plate IDs are to be unassigned to which User IDs"
    })
    async assignPlates(
      @Body() reqBody: GetPlateReviewerBodyDTO[], 
    ): Promise<StatusMessage> {
      return this.plateReviewerService.assignPlateToReviewer(reqBody);
    }
  
    @Delete()
    @ApiOkResponse({description: "Status message saying if the records are removed", type: StatusMessage, schema: {$ref: getSchemaPath(StatusMessage)}})
    @ApiBadRequestResponse({ description: "Bad Request Exception"})
    @ApiInternalServerErrorResponse({ description: "Something went wrong!! Contact Administrator" })
    @ApiBody({
      type: [GetPlateReviewerBodyDTO],
      schema: { $ref: getSchemaPath(GetPlateReviewerBodyDTO) },
      description: "List of objects which denotes which Plate IDs are to be unassigned to which User IDs"
    })
    async unassignPlates(
      @Body() reqBody: GetPlateReviewerBodyDTO[], 
    ): Promise<StatusMessage> {
      return this.plateReviewerService.unassignPlateToReviewer(reqBody);
    }
}
