import { Injectable } from '@nestjs/common';
import { FoodProviderService } from '../../common/services/food-provide-service/food-provide';
import { UsersService } from '../users/users.service';
import { UserProfile } from '../users/entities/complete.register.entity';
import { UserGoal } from '../users/dto/user-goal.enum';
import { ActivityLevel } from '../users/dto/user-activity-level.enum';


@Injectable()
export class FoodRecommendationService {
  constructor(
    private foodProviderService: FoodProviderService,
    private userService: UsersService,
  ) {}

  async recommend(userId: string, mealType: string) {
    const user = await this.userService.getOrCreateProfile(userId);
    console.log('User id:', userId); // Debugging log
console.log('User Profile:', user); // Debugging log
    const foods = await this.foodProviderService.fetchFoods(user, mealType);

    return foods
      .map(food => ({
        ...food,
        score: this.scoreFood(food, user, mealType),
      }))
      .sort((a, b) => b.score - a.score)
      .slice(0, 10);
  }

  scoreFood(food: any, user: UserProfile, mealType: string): number {
    const mealTarget = this.getMealTarget(user, mealType);

    // 🔥 Calories Score (40)
    const diff = Math.abs(food.calories - mealTarget);
    const calorieScore = Math.max(0, 40 - (diff / mealTarget) * 40);

    // 🥩 Macro Score (30)
    const total = food.protein + food.carbs + food.fats || 1;

    const proteinRatio = food.protein / total;
    const carbRatio = food.carbs / total;
    const fatRatio = food.fats / total;

    const target = this.getMacroTarget(user.goal);

    const deviation =
      Math.abs(proteinRatio - target.protein) +
      Math.abs(carbRatio - target.carbs) +
      Math.abs(fatRatio - target.fats);

    const macroScore = Math.max(0, 30 - deviation * 30);

    // 🎯 Goal Score (20)
    let goalScore = 0;
    if (user.goal === UserGoal.GAIN_WEIGHT && food.tags.includes('high_calorie'))
      goalScore = 40;
    if (user.goal === UserGoal.LOSE_WEIGHT && food.tags.includes('low_calorie'))
      goalScore = 20;

    // 🏃 Activity Score (10)
    let activityScore = 0;
    if (
      [ActivityLevel.ADVANCED, ActivityLevel.TRUE_BEAST].includes(user.activity_level) &&
      food.tags.includes('high_protein')
    ) {
      activityScore = 10;
    }

    return calorieScore + macroScore + goalScore + activityScore;
  }

  getMealTarget(user: UserProfile, mealType: string): number {
    const ratio = {
      breakfast: 0.25,
      lunch: 0.35,
      dinner: 0.4,
    };

    return user.daily_calories * ratio[mealType];
  }

  getMacroTarget(goal: UserGoal) {
    switch (goal) {
      case UserGoal.GAIN_WEIGHT:
        return { protein: 0.25, carbs: 0.5, fats: 0.25 };
      case UserGoal.LOSE_WEIGHT:
        return { protein: 0.4, carbs: 0.3, fats: 0.3 };
      default:
        return { protein: 0.3, carbs: 0.4, fats: 0.3 };
    }
  }
}