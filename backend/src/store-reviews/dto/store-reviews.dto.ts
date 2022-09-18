import { IsEmail, IsString } from 'class-validator';

export class StoreReviewsDto {
  @IsString()
  name: string;
  @IsEmail()
  email: string;
  @IsString()
  text: string;
}
