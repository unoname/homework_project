import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { Profile } from '../profile/profile.entity';
import * as bcrypt from 'bcrypt';
import { CreateUserWithProfileDto } from './dto/create-user-with-profile.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    private readonly profileRepository: Repository<Profile>,
  ) {}

  async findByEmailOrLogin(emailOrLogin: string): Promise<User> {
    const user = await this.usersRepository.findOne({
      where: [{ email: emailOrLogin }, { login: emailOrLogin }],
    });
    return user;
  }

  async create(userDto: CreateUserWithProfileDto): Promise<User> {
    const { user: userFromRequest, profile } = userDto;
    const { login, email, password } = userFromRequest;
    const saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds);
    const hashedPassword = await bcrypt.hash(password, salt);
    const user: Partial<User> = {
      login,
      email,
      password: hashedPassword,
      profile,
    };
    const savedUser = await this.usersRepository.save(user);

    if (profile) {
      const savedProfile = await this.profileRepository.save({
        ...profile,
        user: savedUser,
      });

      return {
        ...savedUser,
        profile: savedProfile,
      };
    }

    return { ...savedUser };
  }

  async findOne(id: number): Promise<User> {
    return this.usersRepository.findOne({
      where: { id: id },
      relations: ['profile'],
    });
  }

  async update(id: number, data: Partial<User>): Promise<User> {
    await this.usersRepository.update(id, data);
    return this.usersRepository.findOne({
      where: { id: id },
      relations: ['profile'],
    });
  }

  async remove(id: number): Promise<void> {
    await this.usersRepository.delete(id);
  }
}
