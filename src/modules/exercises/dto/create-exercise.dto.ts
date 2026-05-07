import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsIn, IsNotEmpty, IsOptional, IsString } from 'class-validator';

enum ExerciseLevel {
  BEGINNER = 'beginner',
  INTERMEDIATE = 'intermediate',
  ADVANCED = 'advanced',
}

export class CreateExerciseDto {
  @ApiProperty({ example: 'a9e268ab-6775-4275-b575-58fdcaca1ce6' })
  @IsString()
  @IsNotEmpty()
  subCategoryId: string;

  @ApiProperty({ example: 'Inline Bench Press' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    example:
      'A compound exercise that targets the chest, shoulders, and triceps.',
  })
  @IsString()
  @IsNotEmpty()
  description: string;

  //enum validation for level
  @ApiProperty({ example: 'beginner' })
  @IsIn([
    ExerciseLevel.BEGINNER,
    ExerciseLevel.INTERMEDIATE,
    ExerciseLevel.ADVANCED,
  ])
  @IsString()
  @IsNotEmpty()
  level: ExerciseLevel;

  @ApiProperty({ example: 4 })
  @IsNotEmpty()
  sets: number;

  @ApiProperty({ example: 10 })
  @IsNotEmpty()
  reps: number;

  @ApiProperty({ example: 20 })
  @IsNotEmpty()
  time: number;

  @ApiPropertyOptional({ type: 'string', format: 'binary' })
  @IsOptional()
  image?: Express.Multer.File;

  @ApiPropertyOptional({ type: 'string', format: 'binary' })
  @IsOptional()
  video?: Express.Multer.File;
}
