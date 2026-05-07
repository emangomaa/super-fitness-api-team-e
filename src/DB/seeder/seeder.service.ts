import { InjectRepository } from '@nestjs/typeorm';
import { Category } from '../../modules/categories/entities/category.entity';
import { Repository } from 'typeorm';
import { Injectable, Logger, type LoggerService } from '@nestjs/common';
import { categoriesData } from './seeder.data';

@Injectable()
export class SeedService {
  private readonly logger = new Logger(SeedService.name, { timestamp: true });
  constructor(
    @InjectRepository(Category)
    private categoryRepo: Repository<Category>,
  ) {}

  async seed() {
    const count = await this.categoryRepo.count();
    if (count > 0) {
      this.logger.log('Already seeded');
      return;
    }

    await this.categoryRepo.save({
      name: 'Full Body',
      image_url: 'https://example.com/full-body.jpg',
    });

    for (const cat of categoriesData) {
      const category = this.categoryRepo.create({
        name: cat.name,
        image_url: cat.image_url,
        subCategories: cat.subCategories!.map((sub) => ({
          name: sub.name,
          image_url: sub.image_url,
          exercises: sub.exercises.map((ex) => ({
            name: ex.name,
            description: ex.description,
            level: ex.level,
            sets: ex.sets,
            reps: ex.reps,
            time: ex.time,
            image_url: ex.image_url,
            video_url: ex.video_url,
          })),
        })),
      } as Category);

      await this.categoryRepo.save(category);
    }

    this.logger.log('Seeding done');
  }
}
