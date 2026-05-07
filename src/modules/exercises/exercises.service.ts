import { Injectable } from '@nestjs/common';
import { CreateExerciseDto } from './dto/create-exercise.dto';
import { UpdateExerciseDto } from './dto/update-exercise.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Exercise } from './entities/exercise.entity';
import { FileUploadService } from '../../common/services/file-upload-service/file-upload.service';
import { SubCategory } from '../sub-categories/entities/sub-category.entity';

@Injectable()
export class ExercisesService {
  constructor(
    @InjectRepository(Exercise)
    private readonly exerciseRepo: Repository<Exercise>,
    @InjectRepository(SubCategory)
    private readonly subCategoryRepo: Repository<SubCategory>,
    private readonly fileUploadService: FileUploadService,
  ) {}

  async create(
    createExerciseDto: CreateExerciseDto,
    file?: Express.Multer.File,
  ) {
    const subCategory = await this.subCategoryRepo.findOne({
      where: { id: createExerciseDto.subCategoryId },
    });
    if (!subCategory) {
      throw new Error('SubCategory not found');
    }
    let image_url: string | undefined = undefined;
    let image_public_id: string | undefined = undefined;
    if (file) {
      ({ image_url, image_public_id } =
        await this.fileUploadService.uploadSingle(file));
    }
    return this.exerciseRepo.save({
      subCategory: subCategory,
      name: createExerciseDto.name,
      description: createExerciseDto.description,
      level: createExerciseDto.level,
      sets: createExerciseDto.sets,
      reps: createExerciseDto.reps,
      time: createExerciseDto.time,
      image_url,
      image_public_id,
      video_url: undefined,
      video_public_id: undefined,
    } as Exercise);
  }

  findAll() {
    return this.exerciseRepo.find({ relations: ['subCategory'] });
  }

  findOne(id: string) {
    return this.exerciseRepo.findOne({
      where: { id },
      relations: ['subCategory'],
    });
  }

  update(id: string, updateExerciseDto: UpdateExerciseDto) {
    return this.exerciseRepo.update(id, updateExerciseDto);
  }

  remove(id: string) {
    return this.exerciseRepo.delete(id);
  }
}
