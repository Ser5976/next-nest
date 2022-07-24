import { IsArray, IsString } from "class-validator";

export class BrandDto{
    @IsString()
    name:string
    @IsArray()
   @IsString({each:true})
    logo:string[]
}