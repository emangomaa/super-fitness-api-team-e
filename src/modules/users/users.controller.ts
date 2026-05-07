import { Controller, Body, Patch, Req, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import type { AuthRequest } from '../../common/types/req.type';
import type { Gender } from './dto/gender.type';
import { ApiBearerAuth } from '@nestjs/swagger';
import { ApiBody, ApiOperation, ApiResponse } from '@nestjs/swagger';
import {
  UpdateActivityLevelDto,
  UpdateGoalDto,
} from './dto/update-goal-and-activity.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { AuthGuard } from '@nestjs/passport';
import { Public } from '../../common/decorators/public_decorator';

@Controller('users')
@ApiBearerAuth()
export class UsersController {
  constructor(private readonly usersService: UsersService) { }









  @Post()
  @ApiOperation({ summary: 'Create new user' })
  @ApiBody({
    type: CreateUserDto,
    description: 'User created data',
  })
  @ApiResponse({
    status: 201,
    description: 'User created successfully',
  })
  @ApiResponse({
    status: 400,
    description: 'Validation error',
  })
  createUser(@Body() dto: CreateUserDto) {
    return this.usersService.createUser(dto);
  }

  @Patch('gender')
  updateGender(@Req() req: AuthRequest, @Body('gender') gender: Gender) {
    const userId = req.user.id;
    return this.usersService.updateGender(userId, gender);
  }

  @Patch('age')
  updateAge(@Req() req: AuthRequest, @Body('age') age: number) {
    const userId = req.user.id;
    return this.usersService.updateAge(userId, age);
  }

  @Patch('weight')
  updateWeight(@Req() req: AuthRequest, @Body('weight') weight: number) {
    const userId = req.user.id;
    return this.usersService.updateWeight(userId, weight);
  }

  @Patch('height')
  updateHeight(@Req() req: AuthRequest, @Body('height') height: number) {
    const userId = req.user.id;
    return this.usersService.updateHeight(userId, height);
  }

  @Patch('goal')
  @ApiBody({ type: UpdateGoalDto })
  updateGoal(@Req() req: AuthRequest, @Body() updateGoalDto: UpdateGoalDto) {
    const userId = req.user.id;
    return this.usersService.updateGoal(userId, updateGoalDto.goal);
  }

  @Patch('activity-level')
  @ApiBody({ type: UpdateActivityLevelDto })
  updateActivityLevel(
    @Req() req: AuthRequest,
    @Body() updateActivityLevelDto: UpdateActivityLevelDto,
  ) {
    const userId = req.user.id;
    return this.usersService.updateActivityLevel(
      userId,
      updateActivityLevelDto.activityLevel,
    );
  }

  @Patch('update-profile')
  @ApiBody({ type: UpdateProfileDto })
@Public()
  updateUserProfile(
    @Req() req: AuthRequest,
    @Body() updateProfileDto: UpdateProfileDto,
  ) {
    // const userId = req.user.id;
    return this.usersService.updateUserProfile(
      "dab1afcc-43f1-4494-8b3e-7a60d220033c",
      updateProfileDto,
    );
  }
}
