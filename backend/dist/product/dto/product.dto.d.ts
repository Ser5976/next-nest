declare class Characterictic {
    title: string;
    property: string;
}
export declare class ProductDto {
    name: string;
    description: string;
    characteristic: Characterictic[];
    brandId: string;
    typeId: string;
    categoryId: string;
    price: string;
    oldPrice: string;
    files: string[];
}
export {};
