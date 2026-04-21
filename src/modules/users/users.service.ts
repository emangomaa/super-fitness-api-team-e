import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersRepository } from './repository/users.repository';

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepository) {}

  create(createUserDto: CreateUserDto) {
    return this.usersRepository.create(createUserDto);
  }

  findAll() {
    return this.usersRepository.findAll();
  }

  findOne(id: string) {
    return this.usersRepository.findOne(`id = $1`, [id]);
  }

  update(id: string, updateUserDto: UpdateUserDto) {
    return this.usersRepository.update(`id = $1`, [id], updateUserDto);
  }

  remove(id: string) {
    return this.usersRepository.delete(`id = $1`, [id]);
  }
}
