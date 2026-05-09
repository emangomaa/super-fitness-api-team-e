import { Controller, Req } from '@nestjs/common';
import { FoodRecommendationService } from './food-recomendations.service';
import { Get, Query } from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
import type { AuthRequest } from '../../common/types/req.type';
@Controller('food-recommendations')
@ApiBearerAuth()
export class FoodRecommendationsController {
constructor(private foodRecommendationService: FoodRecommendationService) {}
  @Get() 
  async getRecommendations(
    @Req() req: AuthRequest,
    @Query('mealType') mealType: string,
  ) {
    const userId = req.user.id;
    return this.foodRecommendationService.recommend(userId, mealType);
  }
}