import { IsString } from 'class-validator';

export class PosterTypeDto {
  @IsString()
  picture: string;
  @IsString()
  typeId: string;
  @IsString()
  text: string;
}
