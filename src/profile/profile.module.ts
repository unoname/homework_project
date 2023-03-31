import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserService } from 'src/user/user.service';
import { ProfileController } from './profile.controller';
import { Profile } from './profile.entity';
import { ProfileService } from './profile.service';

@Module({
    imports: [TypeOrmModule.forFeature([Profile])],
    providers: [ProfileService],
    controllers: [ProfileController],
    exports: [UserService, ProfileService],
})
export class ProfileModule {}
