import { IsString } from 'class-validator';

export class ReviewsDto {
  @IsString()
  productId: string;

  @IsString()
  name: string;

  @IsString()
  text: string;
}
