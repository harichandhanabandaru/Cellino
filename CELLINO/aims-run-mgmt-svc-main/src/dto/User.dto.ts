import { ApiProperty } from "@nestjs/swagger";
import { IsUUID } from "class-validator";

export class UserDTO{
    @ApiProperty()
    @IsUUID('all')
    id: string;

    @ApiProperty()
    firstName: string;

    @ApiProperty()
    lastName: string;

    @ApiProperty()
    email: string;
}