import { IsArray, IsString } from 'class-validator';
class Characterictic {
  title: string;
  property: string;
}
export class ProductDto {
  @IsString()
  name: string;
  @IsString()
  description: string;

  characteristic: Characterictic[];

  @IsString()
  brandId: string;
  @IsString()
  typeId: string;
  @IsString()
  categoryId: string;
  @IsString()
  price: string;
  @IsString()
  oldPrice: string;
  @IsArray()
  @IsString({ each: true }) //для валидации внутри массива
  files: string[];
}
