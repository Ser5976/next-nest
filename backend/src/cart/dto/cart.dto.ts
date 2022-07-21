import { IsNumber, IsString } from 'class-validator';

export class CartDto {
  @IsString()
  name: string;

  @IsString()
  productId: string;

  @IsNumber()
  price: number;

  @IsNumber()
  oldPrice?: number;

  @IsString()
  picture: string;
}
