import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { OnboardingService } from './onboarding.service';
import { CreateOnboardingPageDto } from './dto/create-onboarding-page.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { multerConfig } from '../../common/services/file-upload-service/config/multer.config';
import { FileUploadService } from '../../common/services/file-upload-service/file-upload.service';
import { ApiBody, ApiConsumes } from '@nestjs/swagger';

@Controller('onboarding')
export class OnboardingController {
  constructor(
    private readonly onboardingService: OnboardingService,
    private readonly fileUploadService: FileUploadService,
  ) {}

  @Get()
  findAll() {
    return this.onboardingService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.onboardingService.findOne(+id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.onboardingService.remove(+id);
  }

  @Post()
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        title: { type: 'string', example: 'Welcome' },
        description: { type: 'string', example: 'App description' },
        page_order: { type: 'number', example: 1 },
        image: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  @UseInterceptors(FileInterceptor('image', multerConfig))
  async createOnboardingPage(
    @UploadedFile() file: Express.Multer.File,
    @Body() body: CreateOnboardingPageDto,
  ) {
    const { image_url, image_public_id } =
      await this.fileUploadService.uploadSingle(file);

    return this.onboardingService.create({
      ...body,
      image_url,
      image_public_id,
    });
  }
}
