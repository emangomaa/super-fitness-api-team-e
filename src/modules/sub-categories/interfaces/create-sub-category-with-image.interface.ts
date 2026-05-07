import { CreateSubCategoryDto } from '../dto/create-sub-category.dto';

export interface ICreateSubCategoryWithImage extends CreateSubCategoryDto {
  image_url?: string | null;
  image_public_id?: string | null;
}
