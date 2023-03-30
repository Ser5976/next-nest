export class QueryParametrsDto {
  typeId: string;

  page?: string;

  limit?: number;

  brandId?: any;

  minPrice?: string; //диапазон цены товары,для выборки
  maxPrice?: string;
}
