import { Base, TimeStamps } from '@typegoose/typegoose/lib/defaultClasses';
export interface StoreReviewsModel extends Base {
}
export declare class StoreReviewsModel extends TimeStamps {
    name: string;
    email: string;
    text: string;
    response: string;
}
