import { Entity, Column, PrimaryGeneratedColumn, OneToOne } from 'typeorm';
import { UserProfile } from './complete.register.entity';
import { UserRole } from '../../../common/constants/user-role.constants';

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

  @Column({
    type: 'enum',
    enum: UserRole,
    default: UserRole.USER,
  })
  role: UserRole;

  @OneToOne(() => UserProfile, (profile) => profile.user)
  profile: UserProfile;
}
