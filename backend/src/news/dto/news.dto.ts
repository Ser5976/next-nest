import { IsString } from 'class-validator';

export class NewsDto {
  @IsString()
  name: string;
  @IsString()
  text: string;
}
