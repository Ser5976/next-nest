import { IsString } from 'class-validator';

export class ForCustomersDto {
  @IsString()
  title: string;
  @IsString()
  description: string;
}
