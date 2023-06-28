import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsEnum, IsOptional, IsUUID, Min } from "class-validator";
import { EventType } from "../enums/EventType";
import { PaginationDTO } from "./pagination.dto";

/**
 * DTO for fetching the data from the request params. Can be used as part of Validation Type.
 */
export class EventReqParam extends PaginationDTO{
  @IsOptional()
  @Type(() => String)
  @IsUUID("all")
  @ApiProperty({ required: false })
  plateId: string;

  @IsOptional()
  @IsEnum(EventType)
  @ApiProperty({ required: false })
  eventType: EventType;

  @IsOptional()
  @ApiProperty({required: false})
  bioseroMasterOrderId: string

  @IsOptional()
  @ApiProperty({required: false})
  page: number;

  @IsOptional()
  @ApiProperty({required: false})
  size: number;
}
