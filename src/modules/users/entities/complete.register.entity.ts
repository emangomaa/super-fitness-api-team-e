import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { User } from './user.entity';
import { UserGoal } from '../dto/user-goal.enum';
import { ActivityLevel } from '../dto/user-activity-level.enum';

@Entity('user_profiles')
export class UserProfile {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(() => User, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'userId' })
  user: User;

  @Column({ type: 'varchar', nullable: true })
  gender: string;

  @Column({ type: 'int', nullable: true })
  age: number;

  @Column({ type: 'float', nullable: true })
  weight: number;

  @Column({ type: 'float', nullable: true })
  height: number;

  @Column({
    type: 'enum',
    enum: UserGoal,
    nullable: true,
  })
  goal: UserGoal;

  @Column({
    type: 'enum',
    enum: ActivityLevel,
    nullable: true,
  })
  activity_level: ActivityLevel;

  @Column({ type: 'float', default: 0 })
  daily_calories: number;


  @Column({ default: 0 })
  registration_step: number;

  @CreateDateColumn()
  created_at: Date;
}
