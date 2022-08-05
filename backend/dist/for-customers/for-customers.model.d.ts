import { Base, TimeStamps } from '@typegoose/typegoose/lib/defaultClasses';
export interface ForCustomersModel extends Base {
}
export declare class ForCustomersModel extends TimeStamps {
    title: string;
    description: string;
}
