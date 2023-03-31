import { Entity, Column, PrimaryGeneratedColumn, OneToOne} from 'typeorm';
import { User } from '../user/user.entity';

@Entity()
export class Profile {
@PrimaryGeneratedColumn()
id: number;

@Column({unique: true, nullable: true})
fullName: string;

@Column({unique: true, nullable: true})
phone: string;

@OneToOne(() => User)
user: User;
}