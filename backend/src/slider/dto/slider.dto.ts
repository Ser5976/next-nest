import { IsString } from 'class-validator';

export class SliderDto {
  @IsString()
  picture: string;
  @IsString()
  typeId: string;
  @IsString()
  text: string;
}
