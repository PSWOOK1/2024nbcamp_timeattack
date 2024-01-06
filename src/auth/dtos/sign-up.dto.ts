import { PickType } from '@nestjs/swagger';
import { IsNotEmpty, IsStrongPassword } from 'class-validator';
import { User } from 'src/user/entities/user.entity';

export class SignUpDto extends PickType(User, [
  'email',
  'password',
  'name',
  'phoneNumber',
]) {
  /**
   * passwordConfirm
   * @example "TestTest12!"
   */
  @IsNotEmpty({ message: 'passwordConfirm 는 필수 입력사항 입니다' })
  @IsStrongPassword(
    {},
    {
      message:
        '비밀번호는 알파벳 대소문자, 숫자, 특수문자를 포함해 8자리 이상이어야 합니다',
    },
  )
  passwordConfirm: string;
}
