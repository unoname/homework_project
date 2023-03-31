import { Controller, Get, Post, Body, Param, Patch, Delete, UseGuards} from '@nestjs/common';
import { ProfileService } from './profile.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';


@Controller('profile')
@UseGuards(JwtAuthGuard)
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}

  @Post()
  async create(@Body() data: any) {
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
