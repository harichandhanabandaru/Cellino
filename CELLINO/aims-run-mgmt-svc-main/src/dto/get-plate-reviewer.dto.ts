import { ApiProperty } from "@nestjs/swagger";

export class GetPlateReviewerBodyDTO {
    
    @ApiProperty({ description: "User ID", type: String})
    userId: string;

    @ApiProperty({ description: "List of Plates", type: [String]})
    plateIds: string[];
}