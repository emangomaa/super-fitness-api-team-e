import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Category } from './entities/category.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { ICreateCategoryWithImage } from './interfaces/create-category-with-image.interface';
import { FileUploadService } from '../../common/services/file-upload-service/file-upload.service';

@Injectable()
export class CategoriesService {
  constructor(
    private readonly fileUploadService: FileUploadService,
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
  ) {}

  async create(
    createCategoryDto: CreateCategoryDto,
    file?: Express.Multer.File,
  ) {
    let image_url: string | undefined = undefined;
    let image_public_id: string | undefined = undefined;
    if (file) {
      ({ image_url, image_public_id } =
        await this.fileUploadService.uploadSingle(file));
    }
    return await this.categoryRepository.save({
      ...createCategoryDto,
      image_url,
      image_public_id,
    });
  }

  findAll() {
    //code to return all categories name and id only
    return this.categoryRepository.find({
      select: ['id', 'name'],
    });
  }

  findOne(id: string) {
    return this.categoryRepository.findOne({
      where: { id },
      relations: ['subCategories'],
    });
  }

  async update(
    id: string,
    updateCategoryDto: UpdateCategoryDto,
    file?: Express.Multer.File,
  ) {
    const category = await this.categoryRepository.findOne({ where: { id } });
    if (!category) {
      throw new NotFoundException('Category not found');
    }
    let image_url: string | undefined = undefined;
    let image_public_id: string | undefined = undefined;
    if (file) {
      ({ image_url, image_public_id } =
        await this.fileUploadService.uploadSingle(file));
    }
    return this.categoryRepository.update(id, {
      ...updateCategoryDto,
      image_url,
      image_public_id,
    });
  }

  async remove(id: string) {
    const category = await this.categoryRepository.findOne({ where: { id } });
    if (!category) {
      throw new NotFoundException('Category not found');
    }
    await this.categoryRepository.delete(id);
    return { message: 'Category deleted successfully' };
  }
}
