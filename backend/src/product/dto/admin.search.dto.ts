import { IsString } from 'class-validator';

export class AdminSearchDto {
  @IsString()
  name: string;
}
