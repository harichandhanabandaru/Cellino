import { ApiPropertyOptional } from "@nestjs/swagger";
import { IsEmail, IsOptional, IsString } from "class-validator";

export class UserRequestDTO {

    @ApiPropertyOptional({ description: "Email to search the user record with" })
    @IsEmail()
    @IsOptional()
    email: string;

    @ApiPropertyOptional({ description: "Name to filter with. Partial insensitive case filtering." })
    @IsString()
    @IsOptional()
    nameLike: string;
}