import { Body, Controller, Get, Post, Query, Headers } from "@nestjs/common";
import {
  ApiCreatedResponse,
  ApiHeader,
  ApiOkResponse,
  ApiTags,
} from "@nestjs/swagger";
import { CreateTagRequestDTO } from "../../dto/create-tag-request.dto";
import { TagDTO } from "../../dto/tag.dto";
import { GetTagRequest } from "../../dto/get-tag-request.dto";
import { TagsPaginatedResponse } from "../../dto/tags-paginated-response.dto";
import { TagService } from "../tag-service/tag-service.service";

@Controller({ path: "tags", version: "1" })
@ApiTags("Tags")
export class TagController {
  constructor(private readonly tagService: TagService) {}

  @Get()
  @ApiOkResponse({ type: TagsPaginatedResponse })
  async getAll(@Query() request: GetTagRequest) {
    return await this.tagService.getAll(request);
  }

  @Post()
  @ApiHeader({
    name: "user-profile",
    required: false,
    description: "(Leave empty.)",
  })
  @ApiCreatedResponse({ type: TagDTO })
  async createTag(
    @Body() request: CreateTagRequestDTO,
    @Headers("user-profile") userProfile: string
  ) {
    return await this.tagService.createTag(request, userProfile);
  }
}
