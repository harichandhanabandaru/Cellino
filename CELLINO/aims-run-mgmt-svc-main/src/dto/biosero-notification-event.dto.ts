import { ApiProperty } from "@nestjs/swagger"
import { IsUUID } from "class-validator"

export class BioseroNotificationEventDTO {
    
    @ApiProperty({description: 'The notification message'})
    data: string

    @ApiProperty({description: 'The notification topic'})
    topic: string

    @ApiProperty({description: 'The notification ID'})
    @IsUUID('all')
    eventId: string

    @ApiProperty({description: 'The notification start time'})
    start: Date

    @ApiProperty({description: 'The notification end time'})
    end: Date

    @ApiProperty({description: 'The organization id in which notification is created'})
    organizationId: string

    @ApiProperty({description: 'The notification group ID'})
    groupId: string

    @ApiProperty({description: 'The notification Owner ID'})
    ownerId: string

    @ApiProperty({description: 'Access policy of the notification'})
    accessPolicy: string

    @ApiProperty({description: 'Sharing policy of the notification'})
    sharingPolicy: string

    @ApiProperty({description: 'Retention policy of the notification'})
    retentionPolicy: string

    @ApiProperty({description: 'The notification Association ID'})
    associationId: string

    @ApiProperty({description: 'The notification activity ID'})
    activityId: string

    @ApiProperty({description: 'The notification actor ID'})
    actorId: string

    @ApiProperty({description: 'The notification subjects'})
    subjects: Array<string>

    @ApiProperty({description: 'The notification tags'})
    tags: Array<string>

    @ApiProperty({description: 'The ID of the orchestrator'})
    orchestratorId: string

    @ApiProperty({description: 'The operator ID'})
    operatorId: string

    @ApiProperty({description: 'The module ID'})
    moduleId: string

    @ApiProperty({description: 'The source trace ID of the notification'})
    sourceTraceIds: Array<string>

    @ApiProperty({description: 'The encryption key for the notification message'})
    encryptionProvider: string
}

export class LatestBioseroNotificationEventDTO{

    @ApiProperty({description: "The id of the biosero notification event"})
    id: string

    @ApiProperty({description: "The endTime of the latest biosero notification event"})
    endTime: Date
}