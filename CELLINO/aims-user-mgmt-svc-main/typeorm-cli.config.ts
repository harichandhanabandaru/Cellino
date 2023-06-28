import { Action } from 'src/entities/action.entity';
import { Condition } from 'src/entities/condition.entity';
import { Field } from 'src/entities/field.entity';
import { Role } from 'src/entities/role.entity';
import { Subject } from 'src/entities/subject.entity';
import { User } from 'src/entities/user.entity';
import { Migration1661165611078 } from 'src/migrations/1661165611078-Migration';
import { Migration1662037020041 } from 'src/migrations/1662037020041-Migration';
import { Migration1663148504811 } from 'src/migrations/1663148504811-Migration';
import { TimeStampMigration1679047761795 } from 'src/migrations/timestamp-1679047761795-migration';
import { DataSource } from 'typeorm';

export default new DataSource({
  type: 'postgres',
  host: process.env.DATABASE_HOST,
  port: +process.env.DATABASE_PORT,
  username: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
  entities: [Action, Condition, Field, Role, User, Subject],
  migrations: [
    Migration1661165611078,
    Migration1662037020041,
    Migration1663148504811,
    TimeStampMigration1679047761795,
  ],
});
