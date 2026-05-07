import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './modules/users/users.module';
import { AuthModule } from './modules/auth/auth.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OnboardingModule } from './modules/onboarding/onboarding.module';
import { FileUploadModule } from './common/services/file-upload-service/file-upload.module';
import { MailerModule } from '@nestjs-modules/mailer'
import { ScheduleModule } from '@nestjs/schedule';
import { BullModule } from '@nestjs/bull';
import { JobsModule } from './modules/jobs/jobs.module';
import { FoodRecommendationsModule } from './modules/food-recomendations/food-recomendations.module';
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
     ScheduleModule.forRoot(),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get<string>('DB_HOST'),
        port: configService.get<number>('DB_PORT'),
        username: configService.get<string>('DB_USER'),
        password: configService.get<string>('DB_PASSWORD'),
        database: configService.get<string>('DB_NAME'),
        entities: [__dirname + '/**/*.entity{.ts,.js}'],
        synchronize: true,
      }),
    }),
    MailerModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        transport: {
          host: config.get('MAIL_HOST'),
          port: config.get('MAIL_PORT'),
          auth: {
            user: config.get('MAIL_USER'),
            pass: config.get('Node_Mailer_Main_Pass'),
          },
          from: config.get('MAIL_USER'),
        },
      }),
    }),
      BullModule.forRoot({
      redis: {
        host: 'localhost',
        port: 6379,
      },
    }),
    UsersModule,
    AuthModule,
    OnboardingModule,
    FileUploadModule,
    JobsModule,
    FoodRecommendationsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
