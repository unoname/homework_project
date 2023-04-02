import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Profile } from './profile.entity';

@Injectable()
export class ProfileService {
  constructor(
    @InjectRepository(Profile)
    private profileRepository: Repository<Profile>,
  ) {}

  async create(userId: number, data: any): Promise<Profile> {
    const profile = new Profile();
    profile.fullName = data.fullName;
    profile.phone = data.phone;
    profile.user = { id: userId } as any;
    return await this.profileRepository.save(profile);
  }

  async findByID(id: number): Promise<Profile> {
    return await this.profileRepository.findOne({
      where: { id: id },
      relations: ['user'],
    });
  }

  async update(id: number, data: any): Promise<Profile> {
    const profile = await this.profileRepository.findOne({
      where: { id: id },
      relations: ['user'],
    });
    profile.fullName = data.firstName || profile.fullName;
    profile.phone = data.phone || profile.phone;
    return await this.profileRepository.save(profile);
  }

  async remove(id: number): Promise<void> {
    await this.profileRepository.delete(id);
  }
}
