import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { Profile } from '../profile/profile.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async findByEmail(email: string): Promise<User> {
    return this.usersRepository.findOne( {{ where: {email: email} });
  }

  async findByLogin(login: string): Promise<User> {
    return this.usersRepository.findBy({ where: {login: login} });
  }

  async create(email: string, password: string, profile: Profile): Promise<User> {
    const user = new User();
    user.email = email;
    user.password = password;
    user.profile = profile;
    return this.usersRepository.save(user);
  }

  async findOne(id: number): Promise<User> {
    return this.usersRepository.findOne({where: {id: id}, relations: ['profile'] });
  }

  async update(id: number, data: Partial<User>): Promise<User> {
    await this.usersRepository.update(id, data);
    return this.usersRepository.findOne({where: {id: id}, relations: ['profile'] });
  }

  async remove(id: number): Promise<void> {
    await this.usersRepository.delete(id);
  }
}