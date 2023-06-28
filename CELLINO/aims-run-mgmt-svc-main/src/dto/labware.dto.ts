import { ApiProperty } from "@nestjs/swagger";
import { IsUUID } from "class-validator";
import { Labware } from "../entities/labware.entity";
import { LabwareType } from "../enums/LabwareType";

export class LabwareDTO {
  @ApiProperty({ description: "The id of labware which is of type uuid" })
  @IsUUID("all")
  id: string;

  @ApiProperty({ description: "The name of labware" })
  name: string;

  @ApiProperty({
    enum: ["PLATE", "FLASK", "TUBE", "RACK", "VIAL", "BOTTLE"],
    description: "The type of labware",
  })
  labwareType: LabwareType;

  @ApiProperty({ description: "Attributes of labware" })
  attributes: { [key: string]: unknown };

  @ApiProperty({ description: "Vendor id associated with the labware" })
  vendorId: string;

  @ApiProperty({ description: "Manufacturer id associated with the labware" })
  manufacturerId: string;

  @ApiProperty({ description: "The id of user who has created the labware" })
  @IsUUID("all")
  createdBy: string;

  @ApiProperty({ description: "The created time of labware" })
  createdAt: Date;

  @ApiProperty({
    description:
      "The id of user who has updated the labware and by default will be the same as createdBy",
  })
  modifiedBy: string;

  @ApiProperty({
    description:
      "The modified time of event and by default will be the same as createdAt",
  })
  modifiedAt: Date;

  @ApiProperty({ description: "Labware status" })
  isActive: boolean;

  constructor(labware: Labware) {
    this.id = labware.id;
    this.name = labware.name;
    this.labwareType =
      LabwareType[labware.labwareType as unknown as keyof typeof LabwareType];
    this.attributes = labware.attributes;
    this.vendorId =
      labware?.vendor?.id || (labware?.vendor as unknown as string);
    this.manufacturerId =
      labware?.manufacturer?.id || (labware?.manufacturer as unknown as string);
    this.createdAt = labware.createdAt;
    this.createdBy = labware.createdBy;
    this.modifiedAt = labware.modifiedAt;
    this.modifiedBy = labware.modifiedBy;
    this.isActive = labware.isActive;
  }
}
