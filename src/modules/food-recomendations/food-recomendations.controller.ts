import { Controller } from '@nestjs/common';
import { FoodRecommendationService } from './food-recomendations.service';
import { Get, Query } from '@nestjs/common';
@Controller('food-recommendations')
export class FoodRecommendationsController {
constructor(private foodRecommendationService: FoodRecommendationService) {}
     @Get()
  async getRecommendations(
    @Query('userId') userId: string,
    @Query('mealType') mealType: string,
  ) {
    return this.foodRecommendationService.recommend(userId, mealType);
  }
}