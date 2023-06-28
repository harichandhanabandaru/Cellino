import { ApiProperty } from "@nestjs/swagger";

export class StatusMessage {
    @ApiProperty({ description: "Operation status", type: String})
    status: string;

    @ApiProperty({ description: "Additional Information on the operation", type: String})
    message: string;

    constructor(status: string, message: string) {
        this.status = status;
        this.message = message;
    }
}