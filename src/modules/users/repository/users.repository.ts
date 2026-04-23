import { Injectable } from '@nestjs/common';
import { AbstractRepository } from '../../../DB/repositories/abstract.repository';
import { User } from '../entities/user.entity';
import { DataSource } from 'typeorm';

@Injectable()
export class UsersRepository extends AbstractRepository<User> {
  protected readonly entity = User;

  constructor(dataSource: DataSource) {
    super(dataSource);
  }
}
