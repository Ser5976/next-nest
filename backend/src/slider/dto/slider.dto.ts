import { IsArray, IsString } from 'class-validator';

export class SliderDto {
  @IsArray()
  @IsString({ each: true })
  picture: string[];
}
