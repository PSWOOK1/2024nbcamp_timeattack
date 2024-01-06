import { PickType } from '@nestjs/swagger';
import { User } from 'src/user/entities/user.entity';

export class LogInDto extends PickType(User, ['email', 'password']) {}
