import { BadRequestException, Injectable } from '@nestjs/common';
import { UserProfileRepository } from './repository/user-profile.repository';
import { Gender } from './dto/gender.type';
import { User } from './entities/user.entity';
import { LoginDto } from '../auth/dto/login.dto';
import { comparePassword, hashPassword } from '../../common/security/hash.util';
import { UsersRepository } from './repository/users.repository';
import { UserGoal } from './dto/user-goal.enum';
import { ActivityLevel } from './dto/user-activity-level.enum';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { UserProfile } from './entities/complete.register.entity';
@Injectable()
export class UsersService {
  constructor(
    private readonly usersProfileRepository: UserProfileRepository,
    private readonly userRepo: UsersRepository,
  ) {}

  // ======================
  // CREATE USER
  // ======================
  async createUser(dto: CreateUserDto) {
    const existingUser = await this.userRepo.findOne('e.email = :email', {
      email: dto.email,
    });

    if (existingUser) {
      throw new BadRequestException('Email already exists');
    }

    const hashedPassword = await hashPassword(dto.password);

    return this.userRepo.create({
      ...dto,
      password: hashedPassword,
    });
  }

  // ======================
  // GET OR CREATE PROFILE
  // ======================
  async getOrCreateProfile(userId: string) {
    let profile = await this.usersProfileRepository.findOne(
      'e.userId = :userId',
      { userId },
    );

    if (!profile) {
      profile = await this.usersProfileRepository.create({
        user: { id: userId } as User,
        registration_step: 0,
      });
    }

    return profile;
  }

  // ======================
  // UPDATE GENDER
  // ======================
  async updateGender(userId: string, gender: Gender) {
    let profile = await this.usersProfileRepository.findOne(
      'e.userId = :userId',
      { userId },
    );

    if (profile) {
      profile = await this.usersProfileRepository.create({
        user: { id: userId } as User,
        gender,
        registration_step: 1,
      });
    }

    return profile;
  }

  // ======================
  // UPDATE AGE
  // ======================
  async updateAge(userId: string, age: number) {
    const profile = await this.usersProfileRepository.findOne(
      'e.userId = :userId',
      { userId },
    );

    if (profile) {
      profile.age = age;
      profile.registration_step = 2;
    }

    return profile;
  }

  // ======================
  // UPDATE WEIGHT
  // ======================
  async updateWeight(userId: string, weight: number) {
    const profile = await this.usersProfileRepository.findOne(
      'e.userId = :userId',
      { userId },
    );

    if (profile) {
      profile.weight = weight;
      profile.registration_step = 3;

      return this.usersProfileRepository.create(profile);
    }

    return profile;
  }

  // ======================
  // UPDATE HEIGHT
  // ======================
  async updateHeight(userId: string, height: number) {
    const profile = await this.usersProfileRepository.findOne(
      'e.userId = :userId',
      { userId },
    );

    if (profile) {
      profile.height = height;
      profile.registration_step = 4;
    }

    return profile;
  }

  // ======================
  // UPDATE GOAL
  // ======================
  async updateGoal(userId: string, goal: UserGoal) {
    const profile = await this.usersProfileRepository.findOne(
      'e.userId = :userId',
      { userId },
    );

    if (profile) {
      profile.goal = goal;
      profile.registration_step = 5;
      return this.usersProfileRepository.create(profile);
    }

    return profile;
  }

  // ======================
  // UPDATE ACTIVITY LEVEL
  // ======================
  async updateActivityLevel(userId: string, activityLevel: ActivityLevel) {
    let profile = await this.usersProfileRepository.findOne(
      'e.userId = :userId',
      { userId },
    );

    if (profile) {
      profile.activity_level = activityLevel;
      profile.registration_step = 6;
      profile = await this.usersProfileRepository.create(profile);
    }

    return profile;
  }

  // ======================
  // VALIDATE USER
  // ======================
  async validateUser(data: LoginDto): Promise<User> {
    const { email, password } = data;

    const user = await this.userRepo.findOne('e.email = :email', {
      email,
    });

    if (!user) {
      console.log("login user")
      throw new Error('Invalid credentials');
    }

    const isPasswordValid = await comparePassword(password, user.password);
    console.log(isPasswordValid);

    if (!isPasswordValid) {
      console.log("login password")
      throw new Error('Invalid credentials');
    }

    return user;
  }

  UserExistsByEmail = async (email: string): Promise<User> => {
    const user = await this.userRepo.findOne('e.email = :email', {
      email,
    });

    if (!user) {
      throw new Error('Invalid credentials');
    }

    return user;
  }




  async updateUserProfile(userId: string, dto: UpdateProfileDto) {
    const dailyCalories = await this.calculateDailyCalories(dto);

    return this.usersProfileRepository.update('"userId"= :userId', { userId }, {
      gender: dto.gender,
      age: dto.age,
      weight: dto.weight,
      height: dto.height,
      goal: dto.goal,
      activity_level: dto.activityLevel,
      daily_calories: dailyCalories,
    });
  }

  async calculateDailyCalories(data: UpdateProfileDto): Promise<number> {
    const s = data.gender === 'male' ? 5 : -161;

    const bmr =
      10 * data.weight +
      6.25 * data.height -
      5 * data.age +
      s;

    const activityMultiplier = {
      'Rookie': 1.2,
      'Beginner': 1.375,
      'Intermediate': 1.55,
      'Advanced': 1.725,
      'True Beast': 1.9,
    };

    let calories = bmr * activityMultiplier[data.activityLevel];

    if (data.goal === UserGoal.GAIN_WEIGHT) calories += 400;
    if (data.goal === UserGoal.LOSE_WEIGHT) calories -= 400;

    return Math.round(calories);
  }
  };
