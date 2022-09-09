import { IBrand } from '../category-product/interface.categoryProduct';

export interface IType {
  _id: string;
  name: string;
  brand: IBrand[];
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface ITypeState {
  productType: IType[];
  isLoading: boolean;
}
