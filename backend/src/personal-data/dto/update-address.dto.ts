import { IsDate, IsString } from 'class-validator';
export class UpdateAddressDto {
  city: string;
  street: string;
  house: string;
  flat?: string;
}
