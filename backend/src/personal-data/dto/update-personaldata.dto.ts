import { IsDate, IsString } from 'class-validator';
export class UpdatePepsonalDataDto {
  name?: string;

  gender?: string;

  birthday?: string;
}
