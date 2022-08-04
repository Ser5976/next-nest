import { Base, TimeStamps } from '@typegoose/typegoose/lib/defaultClasses';
export interface NewsModel extends Base {
}
export declare class NewsModel extends TimeStamps {
    name: string;
    text: string;
}
