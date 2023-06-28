import { ApiProperty } from "@nestjs/swagger";

export class RoleDto {
  @ApiProperty({ description: "ID of a Role" })
  id: string;

  @ApiProperty({ description: "Name for the Role" })
  name: string;

  @ApiProperty({ description: "List of rules/permissions for the given role"})
  rule: Array<Map<string, object>>;
}
