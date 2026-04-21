import { Injectable } from '@nestjs/common';
import { AbstractRepository } from '../../../DB/repositories/abstract.repository';
import { User } from '../entities/user.entity';
import { DataSource } from 'typeorm';

@Injectable()
export class UsersRepository extends AbstractRepository<User> {
  protected readonly tableName = 'users';

  constructor(dataSource: DataSource) {
    super(dataSource);
  }

  async findActiveUsersWithWorkouts() {
    const query = `
      SELECT u.* FROM users u 
      INNER JOIN workouts w ON u.id = w.user_id 
      WHERE u.is_active = true
    `;
    return await this.dataSource.query(query);
  }
}
