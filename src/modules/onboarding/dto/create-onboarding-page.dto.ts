import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsInt, Min, MinLength } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateOnboardingPageDto {
  @ApiProperty({
    example: 'Welcome to our app',
  })
  @MinLength(10, { message: 'Title must be at least 10 characters' })
  @IsString({ message: 'Title must be a string' })
  @IsNotEmpty({ message: 'Title is required' })
  title: string;

  @ApiProperty({
    example: 'This app helps you...',
  })
  @MinLength(10, { message: 'Description must be at least 20 characters' })
  @IsString({ message: 'Description must be a string' })
  @IsNotEmpty({ message: 'Description is required' })
  description: string;

  @ApiProperty({
    example: 1,
  })
  @Type(() => Number)
  @IsInt({ message: 'Page order must be an integer' })
  @Min(1, { message: 'Page order must be at least 1' })
  page_order: number;
}
