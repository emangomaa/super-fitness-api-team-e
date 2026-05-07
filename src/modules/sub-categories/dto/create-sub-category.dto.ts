import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateSubCategoryDto {
  @ApiProperty({ example: 'High Chest' })
  @IsString()
  @IsNotEmpty()
  name: string;
  @ApiProperty({ example: 'a9e268ab-6775-4275-b575-58fdcaca1ce6' })
  @IsString()
  @IsNotEmpty()
  categoryId: string;
  @ApiPropertyOptional({ type: 'string', format: 'binary' })
  @IsOptional()
  image?: any;
}
