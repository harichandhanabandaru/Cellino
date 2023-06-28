import { Controller, Get, Param, Query, ValidationPipe } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiExtraModels,
  ApiInternalServerErrorResponse,
  ApiOkResponse,
  getSchemaPath,
} from '@nestjs/swagger';
import { UserProfileDto } from '../../dto/user-profile.dto';
import { UserRequestDTO } from '../../dto/user-request.dto';
import { UsersService } from '../../user/service/users.service';

@Controller({ path: 'users', version: '1' })
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Get()
  @ApiOkResponse({
    description: 'List of Users or Single user resource if queried using email',
    type: UserProfileDto,
    isArray: true,
  })
  @ApiBadRequestResponse({ description: 'Bad email provided' })
  @ApiInternalServerErrorResponse({
    description: 'Unexpected error. Contact system administrator.',
  })
  async getUserProfiles(
    @Query(new ValidationPipe({ transform: true })) query: UserRequestDTO,
  ): Promise<Array<UserProfileDto>> {
      return this.userService.getAllActiveUsers(query);
  }

  @Get(':id')
  @ApiOkResponse({
    description: 'Returns User record based on a given ID',
    type: UserProfileDto,
  })
  @ApiBadRequestResponse({ description: 'ID is malformed or does not exist' })
  @ApiInternalServerErrorResponse({
    description: 'Unexpected error. Contact system administrator.',
  })
  async getUserProfileById(@Param('id') id: string): Promise<UserProfileDto> {
    return this.userService.getUserProfileById(id);
  }

  @Get(':email/permissions')
  @ApiOkResponse({
    description: 'Lists permissions for given User based on the email provided',
    type: Map<String, Object>,
    isArray: true,
  })
  @ApiBadRequestResponse({ description: 'Bad email provided' })
  @ApiInternalServerErrorResponse({
    description: 'Unexpected error. Contact system administrator.',
  })
  async getUserPermissions(
    @Param('email') email: string,
  ): Promise<Array<Map<string, object>>> {
    return this.userService.getUserRoleRulesByEmail(email);
  }
}
