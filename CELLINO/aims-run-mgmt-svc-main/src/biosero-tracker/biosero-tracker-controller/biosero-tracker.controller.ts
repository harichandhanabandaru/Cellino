import {Body, Controller, Get, Headers, Post, Query} from "@nestjs/common";
import {
  ApiBody, ApiCreatedResponse,
  ApiHeader,
  ApiInternalServerErrorResponse,
  ApiOkResponse,
  ApiTags,
  getSchemaPath
} from "@nestjs/swagger";
import {BioseroTrackerService} from "src/biosero-tracker/biosero-tracker-service/biosero-tracker.service";
import {BioseroTrackerDto} from "src/dto/biosero-tracker.dto";

@ApiTags("Biosero tracker")
@Controller({path:"biosero-tracker", version: "1"})
export class BioseroTrackerController {
  constructor(private readonly bioseroTrackerService:BioseroTrackerService) {}

  @Get("events")
  @ApiOkResponse({type: BioseroTrackerDto, schema:{$ref:getSchemaPath(BioseroTrackerDto)}})
  @ApiInternalServerErrorResponse({description: "Unable to process the data, please try again."})
  async getLatestBioseroTrackerEvent(@Query("type") type:string, @Query("topic") topic: string){
    return await this.bioseroTrackerService.getLatestBioseroTrackerByType(type, topic);
  }

  @Post("events")
  @ApiHeader({
    name: 'user-profile',
    required: false,
    description: 'The user profile will be attached in the Gateway service',
  })
  @ApiInternalServerErrorResponse({description: "Unable to process the data"})
  @ApiBody({type: BioseroTrackerDto, schema:{$ref:getSchemaPath(BioseroTrackerDto)}})
  @ApiCreatedResponse({type: BioseroTrackerDto, schema: {$ref:getSchemaPath(BioseroTrackerDto)}})
  async saveBioseroEvents(@Body() bioseroTrackerDTO: BioseroTrackerDto, @Headers("user-profile") userProfile: string){
    return await this.bioseroTrackerService.saveBioseroTrackerEvents(bioseroTrackerDTO, "seeding", userProfile);
  }

}