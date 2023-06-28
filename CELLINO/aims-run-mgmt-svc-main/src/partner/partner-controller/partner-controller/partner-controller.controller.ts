import {
  Controller,
  Get,
  Query,
  ValidationPipe,
} from "@nestjs/common";
import { ApiOkResponse, ApiTags } from "@nestjs/swagger";
import { PartnerIdsListRequest } from "../../../dto/get-partner-query.dto";
import { PartnerDTO } from "../../../dto/partner.dto";
import { PartnerService } from "../../partner-service/partner-service/partner-service.service";

@Controller({ path: "partners", version: "1" })
@ApiTags("Partner")
export class PartnerController {
  constructor(private readonly partnerService: PartnerService) {}

  @Get()
  @ApiOkResponse({ type: [PartnerDTO] })
  getPartners(
    @Query(new ValidationPipe({ transform: true })) query: PartnerIdsListRequest
  ): Promise<PartnerDTO[]> {
    return this.partnerService.getPartners(query.ids);
  }
}
