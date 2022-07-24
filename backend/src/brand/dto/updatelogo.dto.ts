import { IsArray, IsString } from "class-validator";

export class UpdateLogoDto{
   
    @IsArray()
   @IsString({each:true})
    logo:string[]
}