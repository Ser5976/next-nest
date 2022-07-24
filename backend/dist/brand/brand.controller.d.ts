import { UpdateLogoDto } from './dto/updatelogo.dto';
import { BrandService } from './brand.service';
import { BrandDto } from './dto/brand.dto';
export declare class BrandController {
    private readonly BrandService;
    constructor(BrandService: BrandService);
    createBrand(dto: BrandDto): Promise<import("mongoose").Document<import("mongoose").Types.ObjectId, import("@typegoose/typegoose/lib/types").BeAnObject, any> & import("./brand.model").BrandModel & import("@typegoose/typegoose/lib/types").IObjectWithTypegooseFunction & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    getBrands(searchBrand?: string): Promise<(import("mongoose").Document<import("mongoose").Types.ObjectId, import("@typegoose/typegoose/lib/types").BeAnObject, any> & import("./brand.model").BrandModel & import("@typegoose/typegoose/lib/types").IObjectWithTypegooseFunction & {
        _id: import("mongoose").Types.ObjectId;
    })[]>;
    updateBrand(id: string, dto: UpdateLogoDto): Promise<import("mongoose").Document<import("mongoose").Types.ObjectId, import("@typegoose/typegoose/lib/types").BeAnObject, any> & import("./brand.model").BrandModel & import("@typegoose/typegoose/lib/types").IObjectWithTypegooseFunction & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    removeBrand(id: string): Promise<{
        message: string;
    }>;
}
