import { IsString } from 'class-validator';

export class CategoryProductDto {
  @IsString()
  name: string;
}
