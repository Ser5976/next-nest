import { IsNumber, IsString } from 'class-validator';

export class QueryParametrsDto {
  @IsString()
  typeId: string;
  @IsString()
  page: string;
  @IsString()
  limit: number;

  brandId?: string;

  minPrice?: string; //диапазон цены товары,для выборки
  maxPrice?: string;
}
