import { Injectable } from '@nestjs/common';
import cloudinary from './config/cloudinary.config';
import { UploadedFileResponse } from '../../types/uploaded-file.type';
import { Readable } from 'stream';

@Injectable()
export class FileUploadService {
  async uploadSingle(file: Express.Multer.File): Promise<UploadedFileResponse> {
    return new Promise((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        { folder: 'fitness-app' },
        (error, result) => {
          if (error) return reject(error);

          resolve({
            image_url: result!.secure_url,
            image_public_id: result!.public_id,
          });
        },
      );

      Readable.from(file.buffer).pipe(stream);
    });
  }

  async uploadMultiple(
    files: Express.Multer.File[],
  ): Promise<UploadedFileResponse[]> {
    const uploads = files.map((file) => {
      return new Promise<UploadedFileResponse>((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          { folder: 'fitness-app' },
          (error, result) => {
            if (error) return reject(error);

            resolve({
              image_url: result!.secure_url,
              image_public_id: result!.public_id,
            });
          },
        );

        Readable.from(file.buffer).pipe(stream);
      });
    });

    return Promise.all(uploads);
  }
}
