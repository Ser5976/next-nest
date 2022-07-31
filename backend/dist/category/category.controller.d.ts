import { CategoryDto } from './dto/category.dto';
import { CategoryService } from './category.service';
export declare class CategoryController {
    private readonly CategoryService;
    constructor(CategoryService: CategoryService);
    createProductCategory(dto: CategoryDto): Promise<import("mongoose").Document<import("mongoose").Types.ObjectId, import("@typegoose/typegoose/lib/types").BeAnObject, any> & import("./category.model").CategoryModel & import("@typegoose/typegoose/lib/types").IObjectWithTypegooseFunction & {
        _id: import("mongoose").Types.ObjectId;
    }>;
}
