import { IsBoolean, IsString } from 'class-validator';

export class ExecuteDto {
  @IsString()
  orderId: string;
  @IsBoolean()
  bool: boolean;
}
