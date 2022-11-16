import { IsString, MinLength } from 'class-validator';

export class UpdatePasswordDto {
  @IsString()
  currentPassword: string;

  @MinLength(6, {
    message: 'Пароль должен содержать не менее 6 символов!',
  })
  @IsString()
  password: string;
}
