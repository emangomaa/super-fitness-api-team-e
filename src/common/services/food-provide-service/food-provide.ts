import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { UserProfile } from '../../../modules/users/entities/complete.register.entity';

interface FoodItem {
  id: number;
  name: string;
  image: string;
  readyInMinutes: number;
  mealType: string;
  calories: number;
  protein: number;
  carbs: number;
  fats: number;
  tags: string[];
}

@Injectable()
export class FoodProviderService {
  private API_KEY = process.env.SPOONACULAR_KEY || 'e1132e8ad51f402798349f81fe011a5b';


  constructor(private http: HttpService) {}

  async fetchFoods(user: UserProfile, mealType: string): Promise<FoodItem[]> {
    try {
      const targetCalories = this.getMealTarget(user, mealType);

      const url = `https://api.spoonacular.com/recipes/complexSearch`;

      const response = await firstValueFrom(
        this.http.get(url, {
          params: {
            apiKey: this.API_KEY,
            type: mealType,
            addRecipeNutrition: true,
            number: 20,
            minCalories: targetCalories * 0.8,
            maxCalories: targetCalories * 1.2,
          },
        }),
      );

      return this.normalize(response?.data?.results || [], mealType);
    } catch (error) {
      console.error('Error fetching foods from Spoonacular API:', error);
      return [];
    }
  }

  getMealTarget(user: UserProfile, mealType: string): number {
    const ratio = {
      breakfast: 0.25,
      lunch: 0.35,
      dinner: 0.4,
    };

    return user.daily_calories * (ratio[mealType] || 0.35);
  }

  normalize(apiFoods: any[], mealType: string): FoodItem[] {
    return apiFoods.map(food => ({
      id: food?.id || 0,
      name: food?.title || 'Unknown Food',
      image: food?.image || '',
      readyInMinutes: food?.readyInMinutes || 0,
      mealType: mealType,
      calories: this.getNutrient(food, 'Calories'),
      protein: this.getNutrient(food, 'Protein'),
      carbs: this.getNutrient(food, 'Carbohydrates'),
      fats: this.getNutrient(food, 'Fat'),
      tags: this.buildTags(food),
    }));
  }

  getNutrient(food: any, name: string): number {
    return (
      food.nutrition?.nutrients?.find((n: any) => n.name === name)?.amount || 0
    );
  }

  buildTags(food: any): string[] {
    const calories = this.getNutrient(food, 'Calories');
    const protein = this.getNutrient(food, 'Protein');

    const tags: string[] = [];

    if (calories > 600) tags.push('high_calorie');
    if (calories < 400) tags.push('low_calorie');
    if (protein > 25) tags.push('high_protein');

    return tags;
  }
}