import { Module } from '@nestjs/common';
import { ExercisesService } from './exercises.service';
import { ExercisesController } from './exercises.controller';
import { Exercise } from './entities/exercise.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HttpModule } from '@nestjs/axios';
import { SubCategoriesModule } from '../sub-categories/sub-categories.module';

@Module({
  imports: [
    HttpModule,
    TypeOrmModule.forFeature([Exercise]),
    SubCategoriesModule,
  ],
  controllers: [ExercisesController],
  providers: [ExercisesService],
})
export class ExercisesModule {}
