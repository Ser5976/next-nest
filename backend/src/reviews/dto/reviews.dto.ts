import { IsString } from 'class-validator';

export class ReviewsDto {
  productId?: string;

  store?: string;

  @IsString()
  name: string;

  @IsString()
  text: string;
}
