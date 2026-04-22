import { Injectable } from '@nestjs/common';
import { AbstractRepository } from '../../../DB/repositories/abstract.repository';
import { DataSource } from 'typeorm';
import { UserProfile } from '../entities/complete.register.entity';

@Injectable()
export class UserProfileRepository extends AbstractRepository<UserProfile> {
  protected readonly tableName = 'user_profiles';

  constructor(dataSource: DataSource) {
    super(dataSource);
  }
}