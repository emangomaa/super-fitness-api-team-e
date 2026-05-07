import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { SubCategory } from '../../sub-categories/entities/sub-category.entity';

@Entity('exercises')
export class Exercise {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  level: 'beginner' | 'intermediate' | 'advanced';

  @Column()
  sets: number;

  @Column()
  reps: number;

  @Column()
  time: number;

  @Column({ nullable: true })
  image_url?: string;

  @Column({ nullable: true })
  image_public_id?: string;

  @Column({ nullable: true })
  video_url?: string;

  @Column({ nullable: true })
  video_public_id?: string;

  @ManyToOne(() => SubCategory, (subCategory) => subCategory.exercises)
  subCategory: SubCategory;
}
