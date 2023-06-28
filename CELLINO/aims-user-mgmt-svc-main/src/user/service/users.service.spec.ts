import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { plainToClass } from 'class-transformer';
import { UserProfileDto } from '../../dto/user-profile.dto';
import { User } from '../../entities/user.entity';
import tap from 'tap';
import { UsersService } from './users.service';
import { UserRequestDTO } from '../../dto/user-request.dto';

let usersService: UsersService;
const userMock: User = plainToClass(User, {
  id: '096d2eeb-2404-4a1e-ac6a-698e8835f56a',
  firstName: 'Colin',
  lastName: 'Sik',
  email: 'csik@cellinobio.com',
  active: true,
  role: {
    id: '096d2eeb-2404-4a1e-ac6a-698e8835f56a',
    name: 'Admin',
    rule: [
      {
        action: 'manage',
        subject: 'all',
      },
    ],
  },
});

const userMockWithoutRole = plainToClass(User, {
  id: '096d2eeb-2404-4a1e-ac6a-698e8835f56a',
  firstName: 'Colin',
  lastName: 'Sik',
  email: 'csik@cellinobio.com',
  active: true,
  role: null,
});

const usersListJson = [
  {
    id: '096d2eeb-2404-4a1e-ac6a-698e8835f56a',
    firstName: 'Colin',
    lastName: 'Sik',
    email: 'csik@cellinobio.com',
    active: true,
    role: null,
  },
  {
    id: '096d2eeb-2404-4a1e-acaa-698e8845f56a',
    firstName: 'Colin',
    lastName: 'Sik',
    email: 'csik@cellinobio.com',
    active: true,
    role: null,
  },
  {
    id: '096d2eeb-2404-4b1e-ac6a-697e8835f59a',
    firstName: 'Colin',
    lastName: 'Sik',
    email: 'csik@cellinobio.com',
    active: true,
    role: null,
  },
  {
    id: '096s2eeb-2404-4a2e-ac6a-698e0835f56a',
    firstName: 'Colin',
    lastName: 'Sik',
    email: 'csik@cellinobio.com',
    active: true,
    role: null,
  },
];

const filteredUsersJSON = [
  {
    id: '096s2eeb-2404-4a2e-ac6a-698e0835f56a',
    firstName: 'Colin',
    lastName: 'Sik',
    email: 'csik@cellinobio.com',
    active: true,
    role: null,
  },
];

const usersListMock = usersListJson.map((user) => plainToClass(User, user));
const filteredUsersMock = filteredUsersJSON.map((user) =>
  plainToClass(User, user),
);

const mockedRepo = {
  findOne: () => {
    return userMock;
  },
};

const mockedRepoForWrongEmail = {
  findOne: () => {
    return null;
  },
};

const mockedRepoWithEmptyRole = {
  findOne: () => {
    return userMockWithoutRole;
  },
};

const mockRepoWithId = {
  findOne: () => {
    return userMock;
  },
};

const mockedRepoForWrongID = {
  findOne: () => {
    return null;
  },
};

const mockRepoForUsersList = {
  find: () => {
    return usersListMock;
  },
};

const mockRepoForEmptyListUsers = {
  find: () => {
    return [];
  },
};

const mockedRepoForFilterUsers = {
  find: () => {
    return filteredUsersMock;
  },
};

tap.test('test user service with email', async (tap) => {
  const module: TestingModule = await Test.createTestingModule({
    providers: [
      UsersService,
      {
        provide: getRepositoryToken(User),
        useValue: mockedRepo,
      },
    ],
  }).compile();
  usersService = await module.get(UsersService);
  const user: UserProfileDto = await usersService.getUserProfileByEmail(
    'csik@cellinobio.com',
  );
  tap.equal(user.firstName, 'Colin');
  tap.equal(user.role.name, 'Admin')
});

tap.test('test user service with id as non email', async (tap) => {
  const module: TestingModule = await Test.createTestingModule({
    providers: [
      UsersService,
      {
        provide: getRepositoryToken(User),
        useValue: mockedRepo,
      },
    ],
  }).compile();
  usersService = await module.get(UsersService);
  try {
    await usersService.getUserProfileByEmail('34');
    tap.fail('async thrower did not throw');
  } catch (error) {
    tap.match(error.message, 'The provided user email 34 is not email format');
  }
});

tap.test('test user service with wrong email', async (tap) => {
  const module: TestingModule = await Test.createTestingModule({
    providers: [
      UsersService,
      {
        provide: getRepositoryToken(User),
        useValue: mockedRepoForWrongEmail,
      },
    ],
  }).compile();
  usersService = await module.get(UsersService);
  try {
    await usersService.getUserProfileByEmail('csi@cellinobio.com');
    tap.fail('async didnt throw error');
  } catch (error) {
    tap.match(
      error.message,
      'The user details with email csi@cellinobio.com are not found',
    );
  }
});

tap.test('Test user service with user without role', async (tap) => {
  const module: TestingModule = await Test.createTestingModule({
    providers: [
      UsersService,
      {
        provide: getRepositoryToken(User),
        useValue: mockedRepoWithEmptyRole,
      },
    ],
  }).compile();
  usersService = await module.get(UsersService);
  const users: UserProfileDto = await usersService.getUserProfileByEmail(
    'csik@cellinobio.com',
  );
  tap.equal(users.firstName, 'Colin');
  tap.equal(users.role, undefined);
});

tap.test('test user service with id', async (tap) => {
  const module: TestingModule = await Test.createTestingModule({
    providers: [
      UsersService,
      {
        provide: getRepositoryToken(User),
        useValue: mockRepoWithId,
      },
    ],
  }).compile();
  usersService = await module.get(UsersService);
  const users: UserProfileDto = await usersService.getUserProfileById(
    '096d2eeb-2404-4a1e-ac6a-698e8835f56a',
  );
  tap.equal(users.firstName, 'Colin');
});

tap.test('test user service with id as non uuid', async (tap) => {
  const module: TestingModule = await Test.createTestingModule({
    providers: [
      UsersService,
      {
        provide: getRepositoryToken(User),
        useValue: mockedRepo,
      },
    ],
  }).compile();
  usersService = await module.get(UsersService);
  try {
    await usersService.getUserProfileById('34');
    tap.fail('async thrower did not throw');
  } catch (error) {
    tap.match(error.message, 'The provided user id 34 is not UUID format');
  }
});

tap.test('test user service with wrong id', async (tap) => {
  const module: TestingModule = await Test.createTestingModule({
    providers: [
      UsersService,
      {
        provide: getRepositoryToken(User),
        useValue: mockedRepoForWrongID,
      },
    ],
  }).compile();
  usersService = await module.get(UsersService);
  try {
    await usersService.getUserProfileById(
      '096d2eeb-2404-4a1e-bc6a-698e8835f56a',
    );
    tap.fail('async didnt throw error');
  } catch (error) {
    tap.match(
      error.message,
      'The user details with id 096d2eeb-2404-4a1e-bc6a-698e8835f56a are not found',
    );
  }
});

tap.test('Test list of users', async (tap) => {
  const module: TestingModule = await Test.createTestingModule({
    providers: [
      UsersService,
      {
        provide: getRepositoryToken(User),
        useValue: mockRepoForUsersList,
      },
    ],
  }).compile();
  usersService = await module.get(UsersService);
  const users: Array<UserProfileDto> = await usersService.getAllActiveUsers();
  tap.equal(users.length, 4);
});

tap.test('Test list of user with zero users', async (tap) => {
  const module: TestingModule = await Test.createTestingModule({
    providers: [
      UsersService,
      {
        provide: getRepositoryToken(User),
        useValue: mockRepoForEmptyListUsers,
      },
    ],
  }).compile();
  usersService = module.get(UsersService);
  const users: Array<UserProfileDto> = await usersService.getAllActiveUsers();
  tap.equal(users.length, 0);
});

tap.test('Test permissions for the user', async (tap) => {
  const module: TestingModule = await Test.createTestingModule({
    providers: [
      UsersService,
      {
        provide: getRepositoryToken(User),
        useValue: mockedRepo,
      },
    ],
  }).compile();
  usersService = module.get(UsersService);
  const rule: Array<Map<string, Object>> =
    await usersService.getUserRoleRulesByEmail('csik@cellinobio.com');
  tap.equal(rule.length, 1);
  tap.equal(rule[0]['action'], 'manage');
  tap.equal(rule[0]['subject'], 'all');
});

tap.test('Test permissions for user without role', async (tap) => {
  const module: TestingModule = await Test.createTestingModule({
    providers: [
      UsersService,
      {
        provide: getRepositoryToken(User),
        useValue: mockedRepoWithEmptyRole,
      },
    ],
  }).compile();
  usersService = module.get(UsersService);
  const rule: Array<Map<string, Object>> =
    await usersService.getUserRoleRulesByEmail('csik@cellinobio.com');
  tap.equal(rule.length, 0);
});

tap.test('Test permissions for user with wrong email', async (tap) => {
  const module: TestingModule = await Test.createTestingModule({
    providers: [
      UsersService,
      {
        provide: getRepositoryToken(User),
        useValue: mockedRepoForWrongEmail,
      },
    ],
  }).compile();
  usersService = module.get(UsersService);
  try {
    await usersService.getUserRoleRulesByEmail('csik@cellinobio.com');
    tap.fail('async thrower did not throw');
  } catch (error) {
    tap.match(
      error.message,
      `The user details with email csik@cellinobio.com are not found`,
    );
  }
});

tap.test(
  'Test permissions for user permissions with wrong email format',
  async (tap) => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: getRepositoryToken(User),
          useValue: mockedRepo,
        },
      ],
    }).compile();
    usersService = module.get(UsersService);
    try {
      await usersService.getUserRoleRulesByEmail('34');
      tap.fail('async thrower did not throw');
    } catch (error) {
      tap.match(
        error.message,
        `The provided user email 34 is not email format`,
      );
    }
  },
);

tap.test('Test user with email querry parameter', async (tap) => {
  const module: TestingModule = await Test.createTestingModule({
    providers: [
      UsersService,
      {
        provide: getRepositoryToken(User),
        useValue: mockedRepoForFilterUsers,
      },
    ],
  }).compile();
  usersService = module.get(UsersService);
  const query = new UserRequestDTO();
  query.email = 'csik@cellinobio.com';
  const users: Array<UserProfileDto> = await usersService.getAllActiveUsers(
    query,
  );
  tap.equal(users.length, 1);
});

tap.test('Test user with name like querry parameter', async (tap) => {
  const module: TestingModule = await Test.createTestingModule({
    providers: [
      UsersService,
      {
        provide: getRepositoryToken(User),
        useValue: mockedRepoForFilterUsers,
      },
    ],
  }).compile();
  usersService = module.get(UsersService);
  const query = new UserRequestDTO();
  query.nameLike = 'Colin';
  const users: Array<UserProfileDto> = await usersService.getAllActiveUsers(
    query,
  );
  tap.equal(users.length, 1);
});
