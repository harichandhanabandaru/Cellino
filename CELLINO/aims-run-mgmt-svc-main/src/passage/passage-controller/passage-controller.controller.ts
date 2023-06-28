import { Controller, Get } from "@nestjs/common";
import { ApiBadRequestResponse, ApiOkResponse, ApiTags } from "@nestjs/swagger";
import { PassageService } from "../passage-service/passage-service.service";

@ApiTags("Passage")
@Controller({ path: "passages", version: "1" })
export class PassageController {
  constructor(private readonly passageService: PassageService) {}

  @Get()
  @ApiOkResponse({ type: [Number] })
  @ApiBadRequestResponse()
  async getPlates(): Promise<[Number]> {
    return this.passageService.getPassage();
  }
}
