import { IsBoolean, IsString } from 'class-validator';

export class ExecuteDto {
  @IsString()
  reviewsId: string;
  @IsBoolean()
  bool: boolean;
}
