import { CategoryDto } from './dto/category.dto';
import { CategoryModel } from './category.model';
import { ModelType } from '@typegoose/typegoose/lib/types';
export declare class CategoryService {
    private readonly CategoryModel;
    constructor(CategoryModel: ModelType<CategoryModel>);
    createProductCategory(dto: CategoryDto): Promise<import("mongoose").Document<import("mongoose").Types.ObjectId, import("@typegoose/typegoose/lib/types").BeAnObject, any> & CategoryModel & import("@typegoose/typegoose/lib/types").IObjectWithTypegooseFunction & {
        _id: import("mongoose").Types.ObjectId;
    }>;
}
