import { ApiProperty } from "@nestjs/swagger";

export class BioseroUnassignedOrderDTO {

    @ApiProperty()
    identifier: string

    @ApiProperty()
    parentIdentifier: string

    @ApiProperty()
    restrictToModuleIds: string

    @ApiProperty()
    moduleRestrictionStrategy: string

    @ApiProperty()
    createdBy: string

    @ApiProperty()
    status: string

    @ApiProperty()
    creationTime: Date

    @ApiProperty()
    scheduledStartTime: Date

    @ApiProperty()
    actualStartTime: Date

    @ApiProperty()
    estimatedDuration: string

    @ApiProperty()
    actualEndTime: Date

    @ApiProperty()
    templateName: string

    @ApiProperty()
    inputParameters: Array<Object>

    @ApiProperty()
    outputParameters: Array<Object>

    @ApiProperty()
    schedulingStrategy: string

}