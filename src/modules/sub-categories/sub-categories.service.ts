import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateSubCategoryDto } from './dto/create-sub-category.dto';
import { UpdateSubCategoryDto } from './dto/update-sub-category.dto';
import { Category } from '../categories/entities/category.entity';
import { SubCategory } from './entities/sub-category.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Not, Repository } from 'typeorm';
import { ICreateSubCategoryWithImage } from './interfaces/create-sub-category-with-image.interface';
import { FileUploadService } from '../../common/services/file-upload-service/file-upload.service';

@Injectable()
export class SubCategoriesService {
  constructor(
    private readonly fileUploadService: FileUploadService,
    @InjectRepository(SubCategory)
    private readonly subRepo: Repository<SubCategory>,
    @InjectRepository(Category)
    private readonly categoryRepo: Repository<Category>,
  ) {}

  async create(dto: CreateSubCategoryDto, file?: Express.Multer.File) {
    const category = await this.categoryRepo.findOne({
      where: { id: dto.categoryId },
    });
    if (!category) throw new NotFoundException('Category not found');

    let image_url: string | undefined = undefined;
    let image_public_id: string | undefined = undefined;
    if (file) {
      ({ image_url, image_public_id } =
        await this.fileUploadService.uploadSingle(file));
    }

    const sub = this.subRepo.create({
      name: dto.name,
      category: { id: dto.categoryId },
      image_url,
      image_public_id,
    });

    return this.subRepo.save(sub);
  }
  findAll() {
    return `This action returns all subCategories`;
  }

  findOne(id: number) {
    return `This action returns a #${id} subCategory`;
  }

  async update(
    id: string,
    updateSubCategoryDto: UpdateSubCategoryDto,
    file?: Express.Multer.File,
  ) {
    const subCategory = await this.subRepo.findOne({ where: { id } });
    if (!subCategory) {
      throw new NotFoundException('SubCategory not found');
    }
    let image_url: string | undefined = undefined;
    let image_public_id: string | undefined = undefined;
    if (file) {
      ({ image_url, image_public_id } =
        await this.fileUploadService.uploadSingle(file));
    }
    return this.subRepo.save({
      id,
      ...updateSubCategoryDto,
      image_url,
      image_public_id,
    });
  }

  async remove(id: string) {
    const subCategory = await this.subRepo.findOne({ where: { id } });
    if (!subCategory) {
      throw new NotFoundException('SubCategory not found');
    }
    return this.subRepo.remove(subCategory);
  }
}
