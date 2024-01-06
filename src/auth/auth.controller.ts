import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignUpDto } from './dtos/sign-up.dto';
import { ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { LogInDto } from './dtos/log-in.dto';

@ApiTags('인증 관련')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  /**
   * sign-up
   * @param signUpDto
   * @returns
   */
  @Post('/sign-up')
  async signUp(@Body() signUpDto: SignUpDto) {
    const data = await this.authService.signUp(signUpDto);
    return { statusCode: HttpStatus.CREATED, message: '회원가입 완료', data };
  }

  /**
   * log-in
   * @param req
   * @param LogInDto
   * @returns
   */
  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard('local'))
  @Post('/log-in')
  logIn(@Request() req, @Body() logInDto: LogInDto) {
    const data = this.authService.logIn(req.user.id);
    return { statusCode: HttpStatus.OK, message: '로그인 완료', data };
  }
}
