import { PartialType } from '@nestjs/swagger';
import { CreateOnboardingPageDto } from './create-onboarding-page.dto';

export class CreateOnboardingPageWithImageDto extends PartialType(
  CreateOnboardingPageDto,
) {
  image_url: string;
  image_public_id: string;
}
