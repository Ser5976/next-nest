import { IsString } from 'class-validator';

export class UpdatePosterDto {
  @IsString()
  picture: string;
  @IsString()
  posterId: string;
}
