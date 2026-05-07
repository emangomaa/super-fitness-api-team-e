import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { SubCategory } from '../../sub-categories/entities/sub-category.entity';

@Entity('categories')
export class Category {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  name: string; // مثال: Chest, Shoulder

  @Column({ nullable: true })
  image_url: string;

  @Column({ nullable: true })
  image_public_id: string;

  @OneToMany(() => SubCategory, (subCategory) => subCategory.category, {
    cascade: true,
  })
  subCategories: SubCategory[];
}
