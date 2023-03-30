import { QueryParametrsDto } from './queryParametrs.dto';

export class OptionDto extends QueryParametrsDto {
  price?: { $gte: number; $lte: number };
  characteristic?: { $elemMatch: { property: { $in: string[] } } };
}
