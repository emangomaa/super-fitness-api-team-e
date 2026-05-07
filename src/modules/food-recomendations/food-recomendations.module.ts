import { Module } from '@nestjs/common';
import { FoodRecommendationsController } from './food-recomendations.controller';
import { FoodRecommendationService } from './food-recomendations.service';
import { UsersModule } from '../users/users.module';
import { FoodProviderModule } from '../../common/services/food-provide-service/food-provide.module';
@Module({
    imports: [UsersModule,FoodProviderModule],
    controllers: [FoodRecommendationsController],
    providers: [ FoodRecommendationService],
})
export class FoodRecommendationsModule {
    constructor( private readonly foodRecommendationService: FoodRecommendationService) {
        
    }
}
