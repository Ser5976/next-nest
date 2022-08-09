import { IsObject, IsString } from 'class-validator';

class Address {
  @IsString()
  city: string;
  @IsString()
  street: string;
  @IsString()
  house: string;
  @IsString()
  flat: string;
}

export class OrderDto {
  @IsString()
  product: string;
  user?: string;
  @IsString()
  name: string;
  @IsString()
  email: string;
  @IsObject({ each: true })
  address: Address;
  @IsString()
  delivery: string;
  @IsString()
  payment: string;
  @IsString()
  telephone: string;
}
