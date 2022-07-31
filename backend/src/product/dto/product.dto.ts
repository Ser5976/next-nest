import { IsArray, IsNumber, IsString } from 'class-validator';

export class ProductDto {
  @IsString()
  name: string;
  @IsString()
  brandId: string;
  @IsString()
  typeId: string;
  @IsString()
  categoryId: string;
  @IsNumber()
  price: number;

  oldPrice?: number; // валидацию не ставим потому что свойства необязательное

  @IsArray()
  @IsString({ each: true }) //для валидации внутри массива
  files: string[];
}
