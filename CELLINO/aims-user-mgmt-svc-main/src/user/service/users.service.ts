import {
  BadRequestException,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { isEmail, isUUID } from 'class-validator';
import { UserRequestDTO } from 'src/dto/user-request.dto';
import { Role } from 'src/entities/role.entity';
import { FindOptionsWhere, ILike, Repository } from 'typeorm';
import { RoleDto } from '../../dto/role.dto';
import { UserProfileDto } from '../../dto/user-profile.dto';
import { User } from '../../entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async getUserProfileByEmail(email: string): Promise<UserProfileDto> {
    if (isEmail(email)) {
      const user = await this.userRepository.findOne({
        where: { email: email },
        relations: { role: true },
      });
      if (user !== null) {
        return this.convertUserToUserProfileDTO(user);
      } else {
        Logger.error(
          `The user details with email ${email} are not found`,
          'UserService',
        );
        throw new BadRequestException(
          `The user details with email ${email} are not found`,
        );
      }
    } else {
      Logger.error(
        `The provided user email ${email} is not email format`,
        'UserService',
      );
      throw new BadRequestException(
        `The provided user email ${email} is not email format`,
      );
    }
  }

  async getUserProfileById(id: string): Promise<UserProfileDto> {
    if (isUUID(id)) {
      const user = await this.userRepository.findOne({
        where: { id: id },
        relations: { role: true },
      });
      if (user !== null) {
        return this.convertUserToUserProfileDTO(user);
      } else {
        Logger.error(
          `The user details with id ${id} are not found`,
          'UserService',
        );
        throw new NotFoundException(
          `The user details with id ${id} are not found`,
        );
      }
    } else {
      Logger.error(
        `The provided user id ${id} is not UUID format`,
        'UserService',
      );
      throw new BadRequestException(
        `The provided user id ${id} is not UUID format`,
      );
    }
  }

  convertUserToUserProfileDTO(user: User): UserProfileDto {
    const userProfileDTO = new UserProfileDto();
    userProfileDTO.id = user.id;
    userProfileDTO.firstName = user.firstName;
    userProfileDTO.lastName = user.lastName;
    userProfileDTO.email = user.email;
    if (user.role === null || user.role === undefined) {
      userProfileDTO.role = undefined;
    } else {
      userProfileDTO.role = this.convertUserRoleToUserRoleDTO(user.role);
    }
    return userProfileDTO;
  }

  convertUserRoleToUserRoleDTO(role: Role): RoleDto {
    const roleDTO = new RoleDto();
    roleDTO.id = role.id;
    roleDTO.name = role.name;
    roleDTO.rule = role.rule;
    return roleDTO;
  }

  async getAllActiveUsers(
    query?: UserRequestDTO,
  ): Promise<Array<UserProfileDto>> {
    const multipleFilters: FindOptionsWhere<User>[] = [];
    const filters: FindOptionsWhere<User> = {
      isActive: true,
    };

    if (query?.email) {
      filters.email = query.email;
    }

    if (query?.nameLike) {
      multipleFilters.push({
        ...filters,
        firstName: ILike(`%${query.nameLike}%`),
      });
      multipleFilters.push({
        ...filters,
        lastName: ILike(`%${query.nameLike}%`),
      });
    }

    const users: Array<User> = await this.userRepository.find({
      where: multipleFilters.length > 0 ? multipleFilters : filters,
      relations: { role: true },
    });

    return users.map((user: User) => {
      return this.convertUserToUserProfileDTO(user);
    });
  }

  async getUserRoleRulesByEmail(
    email: string,
  ): Promise<Array<Map<string, object>>> {
    let user: User = null;
    let userRoleDTO: RoleDto = null;
    if (isEmail(email)) {
      user = await this.userRepository.findOne({
        where: { email: email },
        relations: { role: true },
      });
      if (user === null) {
        Logger.error(
          `The user details with email ${email} are not found`,
          'UserService',
        );
        throw new NotFoundException(
          `The user details with email ${email} are not found`,
        );
      } else {
        if (user.role === null || user.role === undefined) {
          return [];
        } else {
          userRoleDTO = this.convertUserRoleToUserRoleDTO(user.role);
        }
        return userRoleDTO.rule;
      }
    } else {
      Logger.error(
        `The provided user email ${email} is not email format`,
        'UserService',
      );
      throw new BadRequestException(
        `The provided user email ${email} is not email format`,
      );
    }
  }
}
