import { Module } from '@nestjs/common';
import { FoodProviderService } from './food-provide';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [HttpModule],
  providers: [FoodProviderService],
  exports: [FoodProviderService],
})
export class FoodProviderModule {}
