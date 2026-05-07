import { CreateOnboardingPageDto } from '../dto/create-onboarding-page.dto';

export interface ICreateOnboardingPageWithImage extends CreateOnboardingPageDto {
  image_url: string;
  image_public_id: string;
}
