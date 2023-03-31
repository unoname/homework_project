import { Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn } from 'typeorm';
import { Profile } from '../profile/profile.entity';

@Entity()
export class User {
@PrimaryGeneratedColumn()
id: number;

@Column({unique: true})
email: string;

@Column()
password: string;

@OneToOne(() => Profile, { cascade: true })
@JoinColumn()
profile: Profile;
}