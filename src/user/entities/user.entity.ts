import {
  IsEmail,
  IsNotEmpty,
  IsPhoneNumber,
  IsString,
  IsStrongPassword,
} from 'class-validator';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn({ unsigned: true })
  id: number; // ?

  /**
   * email
   * @example "test@test.com"
   */
  @IsNotEmpty({ message: 'email 은 필수 입력사항 입니다' })
  @IsEmail({}, { message: 'email 형식에 맞지 않습니다.' })
  @Column({ unique: true })
  email: string;

  /**
   * password
   * @example "TestTest12!"
   */
  @IsNotEmpty({ message: 'password 는 필수 입력사항 입니다' })
  @IsStrongPassword(
    {},
    {
      message:
        '비밀번호는 알파벳 대소문자, 숫자, 특수문자를 포함해 8자리 이상이어야 합니다',
    },
  )
  @Column({ select: false })
  password: string;

  /**
   * name
   * @example "김나박이"
   */
  @IsNotEmpty({ message: '이름 은 필수 입력사항 입니다' })
  @IsString()
  @Column()
  name: string;

  /**
   * phoneNumber
   * @example "010-0000-0000"
   */
  @IsNotEmpty({ message: 'phoneNumber 는 필수 입력사항 입니다' })
  @IsPhoneNumber('KR', { message: '유효하지 않는 전화번호 형식 입니다.' })
  @Column({ unique: true })
  phoneNumber: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
