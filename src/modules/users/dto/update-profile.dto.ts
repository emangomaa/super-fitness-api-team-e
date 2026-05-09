import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNumber, IsString } from 'class-validator';
import { UserGoal } from './user-goal.enum';
import { ActivityLevel } from './user-activity-level.enum';

export enum Gender {
  MALE = 'male',
  FEMALE = 'female'
}


export class UpdateProfileDto {
  @ApiProperty({
    enum: Gender,
    enumName: 'Gender',
    description: 'The gender of the user',
    example: Gender.MALE,
    type: String,
  })
  @IsEnum(Gender)  
  @IsString() 
  gender: Gender;   


  @ApiProperty({
    description: 'The age of the user',
    example: 30,
    type: Number,
  })
  @IsNumber()
  age: number;

    @ApiProperty({
    description: 'The weight of the user in kg',
    example: 70,
    type: Number,
  })
  @IsNumber()
  weight: number;


    @ApiProperty({
    description: 'The height of the user in cm',
    example: 175,
    type: Number,
  })
  @IsNumber()
  height: number;

    @ApiProperty({
        enum: UserGoal,
        enumName: 'UserGoal',
        description: 'The fitness goal of the user',
        example: UserGoal.LOSE_WEIGHT,
        type: String,
    })
  @IsEnum(UserGoal)
  goal: UserGoal;


  @ApiProperty({
    enum: ActivityLevel,
    enumName: 'ActivityLevel',
    description: 'The activity level of the user',
    example: ActivityLevel.BEGINNER,
    type: String,
  })
    @IsEnum(ActivityLevel)
  activityLevel: ActivityLevel;



}

