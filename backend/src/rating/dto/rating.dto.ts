import { IsNumber, IsString, Max, max } from 'class-validator';

export class RatingDto {
  @IsString()
  productId: string;

  @IsNumber()
  @Max(5, { message: 'Рейтин не может быть больше 5' })
  value: number;
}
