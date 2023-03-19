import { IsString } from 'class-validator';

export class QueryParametrsDto {
  typeId: string;
  @IsString()
  page: string;

  limit?: number;

  brandId?: string | string[];

  minPrice?: string; //диапазон цены товары,для выборки
  maxPrice?: string;
}
