import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { User } from './user.entity';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { ProfileService } from 'src/profile/profile.service';
import { Profile } from 'src/profile/profile.entity';
import { ProfileModule } from 'src/profile/profile.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Profile]),
    TypeOrmModule.forRoot(),
    ProfileModule,
  ],
  providers: [UserService, ProfileService],
  controllers: [UserController],
  exports: [UserService],
})
export class UserModule {}
