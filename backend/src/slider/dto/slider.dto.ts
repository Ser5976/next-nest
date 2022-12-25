import { IsString } from 'class-validator';

export class SliderDto {
  @IsString()
  picture: string;
}
