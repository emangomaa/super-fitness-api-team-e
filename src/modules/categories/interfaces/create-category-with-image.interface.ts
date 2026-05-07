import { CreateCategoryDto } from '../dto/create-category.dto';

export interface ICreateCategoryWithImage extends CreateCategoryDto {
  image_url: string;
  image_public_id: string;
}
