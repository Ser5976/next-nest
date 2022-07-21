import { IsString } from 'class-validator';

export class RefreshTokenDto {
  @IsString({
    message: 'токен отсутствует или токен не строка',
  })
  refreshToken: string;
}
