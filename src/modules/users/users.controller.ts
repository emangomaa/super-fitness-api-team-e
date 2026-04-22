import {
  Controller,
  Body,
  Patch,
  Req,
} from '@nestjs/common';
import { UsersService } from './users.service';
import type { AuthRequest } from '../../common/types/req.type';
import type { Gender } from './dto/gender.type';


@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Patch('gender')
  updateGender(@Req() req:AuthRequest, @Body('gender') gender: Gender) {
    const userId = req.user.id;
    return this.usersService.updateGender(userId, gender);
  }

  @Patch('age')
  updateAge(@Req() req :AuthRequest, @Body('age') age: number) {
    const userId = req.user.id;
    return this.usersService.updateAge(userId, age);
  }

  @Patch('weight')
  updateWeight(@Req() req :AuthRequest, @Body('weight') weight: number) {
    const userId = req.user.id;
    return this.usersService.updateWeight(userId, weight);
  }

  @Patch('height')
  updateHeight(@Req() req :AuthRequest, @Body('height') height: number) {
    const userId = req.user.id ;
    return this.usersService.updateHeight(userId, height);
  }
}
