import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { User } from '../user/user.entity';

@Entity()
export class Profile {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true, nullable: true })
  fullName: string;

  @Column({ unique: true, nullable: true })
  phone: string;

  @OneToOne(() => User, (user) => user.profile)
  @JoinColumn()
  user: User;
}
