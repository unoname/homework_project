import { Profile } from 'src/profile/profile.entity';
import { CreateUserDto } from 'src/user/dto/create-user.dto';

export class CreateUserWithProfileDto {
  user: Partial<CreateUserDto>;
  profile?: Profile;
}
