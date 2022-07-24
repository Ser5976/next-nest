import { UpdateLogoDto } from './dto/updatelogo.dto';
import { BrandDto } from './dto/brand.dto';
import { BrandModel } from './brand.model';
import { ModelType } from '@typegoose/typegoose/lib/types';
export declare class BrandService {
    private readonly BrandModel;
    constructor(BrandModel: ModelType<BrandModel>);
    createBrand(dto: BrandDto): Promise<import("mongoose").Document<import("mongoose").Types.ObjectId, import("@typegoose/typegoose/lib/types").BeAnObject, any> & BrandModel & import("@typegoose/typegoose/lib/types").IObjectWithTypegooseFunction & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    getBrands(searchBrand?: string): Promise<(import("mongoose").Document<import("mongoose").Types.ObjectId, import("@typegoose/typegoose/lib/types").BeAnObject, any> & BrandModel & import("@typegoose/typegoose/lib/types").IObjectWithTypegooseFunction & {
        _id: import("mongoose").Types.ObjectId;
    })[]>;
    updateBarnd(id: string, dto: UpdateLogoDto): Promise<import("mongoose").Document<import("mongoose").Types.ObjectId, import("@typegoose/typegoose/lib/types").BeAnObject, any> & BrandModel & import("@typegoose/typegoose/lib/types").IObjectWithTypegooseFunction & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    removeBrand(id: string): Promise<{
        message: string;
    }>;
}
