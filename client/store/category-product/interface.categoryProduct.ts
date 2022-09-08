export interface IProductType {
  _id: string;
  name: string;
  brand: string[];
  createdAt: string;
  updatedAt: string;
  __v: number;
}
export interface IBrand {
  _id: string;
  name: string;
  logo: string[];
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface ICategoryProduct {
  _id: string;
  name: string;
  productType: IProductType[];
  brand: IBrand[];
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface ICategoryProductState {
  categoryProduct: ICategoryProduct[];
  isLoading: boolean;
}
