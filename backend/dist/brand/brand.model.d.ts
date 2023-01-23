import { Base, TimeStamps } from '@typegoose/typegoose/lib/defaultClasses';
export interface BrandModel extends Base {
}
export declare class BrandModel extends TimeStamps {
    name: string;
}
