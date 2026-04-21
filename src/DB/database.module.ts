import { Module } from '@nestjs/common';
import { DatabaseService } from './database.service';
import { UsersRepository } from '../modules/users/repository/users.repository';

@Module({
  providers: [DatabaseService, UsersRepository],
  exports: [DatabaseService, UsersRepository],
})
export class DatabaseModule {}
