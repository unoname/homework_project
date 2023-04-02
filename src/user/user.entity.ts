import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToOne,
  JoinColumn,
  Unique,
} from 'typeorm';
import { Profile } from '../profile/profile.entity';
import { Roles } from './roles.enum';

@Entity()
@Unique(['email', 'login'])
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @Column()
  login: string;

  @Column()
  password: string;

  @Column({
    default: Roles.USER,
  })
  roles: Roles[];

  @OneToOne(() => Profile, { cascade: true })
  @JoinColumn()
  profile: Profile;
}
