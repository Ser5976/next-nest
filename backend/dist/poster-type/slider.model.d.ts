import { Ref } from '@typegoose/typegoose';
import { Base, TimeStamps } from '@typegoose/typegoose/lib/defaultClasses';
import { ProductTypeModel } from 'src/product-type/product-type.model';
export interface SliderModel extends Base {
}
export declare class SliderModel extends TimeStamps {
    picture: string;
    typeId: Ref<ProductTypeModel>;
    text: string;
}
