import { IsString } from 'class-validator';

export class PictureDeleteDto {
  @IsString()
  picture: string;
}
