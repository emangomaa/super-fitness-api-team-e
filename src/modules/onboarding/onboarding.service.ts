import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateOnboardingPageDto } from './dto/create-onboarding-page.dto';
import { UpdateOnboardingPageDto } from './dto/update-onboarding-page.dto';
import { CreateOnboardingPageWithImageDto } from './dto/create-onboarding-page-with-image.dto';
import { OnboardingRepository } from './repository/onboarding.repository';

@Injectable()
export class OnboardingService {
  constructor(private readonly onboardingRepository: OnboardingRepository) {}

  create(createOnboardingPageWithImageDto: CreateOnboardingPageWithImageDto) {
    return this.onboardingRepository.create(createOnboardingPageWithImageDto);
  }

  findAll() {
    return this.onboardingRepository.findAll();
  }

  findOne(id: number) {
    return this.onboardingRepository.findOne(`id = $1`, [id]);
  }

  update(id: number, updateOnboardingPageDto: UpdateOnboardingPageDto) {
    return this.onboardingRepository.update(
      `id = $1`,
      [id],
      updateOnboardingPageDto,
    );
  }

  async remove(id: number) {
    const result = await this.onboardingRepository.delete(`id = $1`, [id]);
    if (!result) {
      throw new NotFoundException(`Onboarding page with ID ${id} not found`);
    }
    return result;
  }
}
