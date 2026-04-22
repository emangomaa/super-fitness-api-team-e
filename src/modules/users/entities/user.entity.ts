import { Entity, Column, PrimaryGeneratedColumn, OneToOne } from 'typeorm';
import { UserProfile } from './complete.register.entity';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  first_name: string;

  @Column()
  last_name: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @OneToOne(() => UserProfile, (profile) => profile.user)
  profile: UserProfile;
}
