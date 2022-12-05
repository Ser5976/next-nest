declare class Address {
    city: string;
    street: string;
    house: string;
    flat?: string;
}
export declare class OrderDto {
    productCart: string[];
    name: string;
    email: string;
    address: Address;
    delivery: string;
    payment: string;
    telephone: string;
    orderAmount: number;
}
export {};
