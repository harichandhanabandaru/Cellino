import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { RoleDto } from '../dto/role.dto';

export class UserProfileDto {
  @ApiProperty({ description: 'ID of a given User' })
  id: string;

  @ApiProperty({ description: 'First Name of the User' })
  firstName: string;

  @ApiPropertyOptional({ description: 'Last Name of the User' })
  lastName: string;

  @ApiProperty({ description: 'Email of the User' })
  email: string;

  @ApiProperty({ description: 'Role Information for the User' })
  role: RoleDto;
}
