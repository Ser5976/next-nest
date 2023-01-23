import { IsString } from 'class-validator';

export class PosterSearchDto {
  @IsString()
  name: string;
}
