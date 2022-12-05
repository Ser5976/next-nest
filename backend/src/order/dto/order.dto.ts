import { IsArray, IsObject, IsString } from 'class-validator';

class Address {
  @IsString()
  city: string;
  @IsString()
  street: string;
  @IsString()
  house: string;
  flat?: string;
}

export class OrderDto {
  @IsArray()
  productCart: string[];
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
  orderAmount: number;
}
