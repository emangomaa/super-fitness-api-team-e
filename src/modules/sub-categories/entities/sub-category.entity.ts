import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  JoinColumn,
} from 'typeorm';
import { Category } from '../../categories/entities/category.entity';
import { Exercise } from '../../exercises/entities/exercise.entity';

@Entity('sub_categories')
export class SubCategory {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string; // مثال: High Chest

  @Column({ nullable: true })
  image_url: string;

  @Column({ nullable: true })
  image_public_id: string;

  @ManyToOne(() => Category, (category) => category.subCategories)
  category: Category;

  @OneToMany(() => Exercise, (exercise) => exercise.subCategory, {
    cascade: true,
  })
  exercises: Exercise[];
}
