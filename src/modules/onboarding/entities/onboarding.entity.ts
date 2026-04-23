import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('onboarding')
export class Onboarding {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'varchar',
    length: 255,
  })
  title: string;

  @Column({
    type: 'text',
  })
  description: string;

  @Column({ name: 'image_url' })
  image_url: string;

  @Column({ name: 'image_public_id' })
  image_public_id: string;

  @Column({
    type: 'int',
    name: 'page_order',
    unique: true,
  })
  page_order: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
