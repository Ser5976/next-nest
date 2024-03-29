import { LoginDto } from './dto/login.dto ';
import {
  Body,
  Controller,
  HttpCode,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegistrationDto } from './dto/registration.dto';
import { RefreshTokenDto } from './dto/refreshToken.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly AuthServies: AuthService) {}
  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Post('register')
  async register(@Body() dto: RegistrationDto) {
    return this.AuthServies.register(dto);
  }
  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Post('login')
  async login(@Body() dto: LoginDto) {
    return this.AuthServies.login(dto);
  }
  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Post('access-token')
  async getNewTokens(@Body() dto: RefreshTokenDto) {
    return this.AuthServies.getNewTokens(dto);
  }
}
