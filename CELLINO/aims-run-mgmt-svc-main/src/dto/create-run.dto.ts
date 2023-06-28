import { RunStatus } from "../enums/RunStatus";
import {
  IsDateString,
  IsNotEmpty,
  IsNumber,
  isNumberString,
  IsString,
  IsUUID,
  Matches,
} from "class-validator";
import { ApiProperty } from "@nestjs/swagger";
import { BioseroOrderInputParametersDTO } from "./biosero-order-template.dto";

export class CreateRunDto {
  @ApiProperty({ description: "Name" })
  @IsString()
  @IsNotEmpty()
  readonly name: string;

  @ApiProperty({ description: "Start Date" })
  @IsDateString()
  @IsNotEmpty()
  readonly start_date: Date;

  @ApiProperty({ description: "Run owner id" })
  @IsUUID()
  readonly run_owner_id: string;

  @ApiProperty({ description: "Run reviewer id" })
  @IsUUID()
  readonly run_reviewer_id: string;

  @ApiProperty({ description: "Run day" })
  @IsNumber()
  readonly run_day: number;

  @ApiProperty({ description: "Objective of run" })
  @IsString()
  readonly objective: string;

  @ApiProperty({ description: "Summary of run" })
  @IsString()
  readonly summary: string;

  @ApiProperty({ description: "Status of run" })
  @IsNotEmpty()
  @Matches(
    `^${Object.values(RunStatus)
      .filter((v) => typeof v !== "number")
      .join("|")}$`,
    "",
    {
      message: `status should be any of [${Object.keys(RunStatus)
        .filter((ele) => !isNumberString(ele))
        .join(", ")}]`,
    }
  )
  readonly status: RunStatus;

  @ApiProperty({ description: "Partner id" })
  @IsUUID()
  readonly partner_id: string;

  @ApiProperty({ description: "Workflow id" })
  @IsUUID()
  readonly workflow_id: string;

  @ApiProperty({ description: "Phase id" })
  @IsUUID()
  readonly phase_id: string;

  @ApiProperty({ description: "biosero order template json" })
  @IsNotEmpty()
  readonly bioseroOrder: BioseroOrderInputParametersDTO;
}
