import { IsEmail, IsString } from 'class-validator';

export class StoreReviewsDto {
  @IsString()
  name: string;
  @IsEmail()
  emaile: string;
  @IsString()
  text: string;
}
