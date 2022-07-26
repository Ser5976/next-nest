import { IsString } from 'class-validator';

export class ProductTypeDto {
  @IsString()
  name: string;
}
