import { PartialType } from '@nestjs/swagger';
import { CreateOnboardingPageDto } from './create-onboarding-page.dto';

export class UpdateOnboardingPageDto extends PartialType(
  CreateOnboardingPageDto,
) {}
