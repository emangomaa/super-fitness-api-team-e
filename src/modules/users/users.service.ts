import { Injectable } from '@nestjs/common';
import { UserProfileRepository } from './repository/user-profile.repository';
import { Gender } from './dto/gender.type';


@Injectable()
export class UsersService {
  constructor(private readonly usersProfileRepository: UserProfileRepository) {}

  async getOrCreateProfile(userId: string) {
    let profile = await this.usersProfileRepository.findOne(
      'user_id = $1',
      [userId],
    );

    if (!profile) {
      profile = await this.usersProfileRepository.create({
        user: { id: userId } as any,
        registration_step: 0,
      });
    }

    return profile;
  }

  // 🔥 update gender
  async updateGender(userId: string, gender: Gender) {
    return this.usersProfileRepository.update(
      'user_id = $1',
      [userId],
      {
        gender,
        registration_step: 1,
      },
    );
  }

  // 🔥 update age
  async updateAge(userId: string, age: number) {
    return this.usersProfileRepository.update(
      'user_id = $1',
      [userId],
      {
        age,
        registration_step: 2,
      },
    );
  }

  // 🔥 update weight
  async updateWeight(userId: string, weight: number) {
    return this.usersProfileRepository.update(
      'user_id = $1',
      [userId],
      {
        weight,
        registration_step: 3,
      },
    );
  }

  // 🔥 update height
  async updateHeight(userId: string, height: number) {
    return this.usersProfileRepository.update(
      'user_id = $1',
      [userId],
      {
        height,
        registration_step: 4,
      },
    );
  }
}
