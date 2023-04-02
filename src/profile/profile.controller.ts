import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Patch,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { ProfileService } from './profile.service';
import { JwtStrategy } from 'src/auth/jwt.strategy';
import { CreateProfileDto } from './dto/creatr-profile.dto';

@Controller('profile')
@UseGuards(JwtStrategy)
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}

  @Post()
  async create(@Body() data: CreateProfileDto) {
    const profile = await this.profileService.create(data.userId, data);
    return { profile };
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const profile = await this.profileService.findByID(+id);
    return { profile };
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() data: any) {
    const profile = await this.profileService.update(+id, data);
    return { profile };
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    await this.profileService.remove(+id);
    return { deleted: true };
  }
}
