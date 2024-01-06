import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/user/entities/user.entity';
import { Repository } from 'typeorm';
import { SignUpDto } from './dtos/sign-up.dto';
import { ConfigService } from '@nestjs/config';
import bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private readonly configService: ConfigService,
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  async signUp({
    email,
    password,
    passwordConfirm,
    name,
    phoneNumber,
  }: SignUpDto) {
    const isPasswordMatched = password === passwordConfirm;
    if (!isPasswordMatched) {
      throw new BadRequestException(
        'password 와 passwordConfirm 가 일치하지 않습니다',
      );
    }

    const existedEmail = await this.userRepository.findOneBy({
      email,
    });
    if (existedEmail) {
      throw new BadRequestException('이미 가입 되어있는 email 입니다.');
    }

    const existedNumber = await this.userRepository.findOneBy({
      phoneNumber,
    });
    if (existedNumber) {
      throw new BadRequestException('이미 가입 되어있는 연락처 입니다.');
    }

    const hashRounds = this.configService.get<number>('PASSWORD_HASH_ROUNDS');
    const hashedPassword = bcrypt.hashSync(password, hashRounds);

    const user = await this.userRepository.save({
      email,
      name,
      password: hashedPassword,
      phoneNumber,
    });
    delete user.password;
    return user;
  }
}
