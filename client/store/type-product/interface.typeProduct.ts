import { IBrand } from '../category-product/interface.categoryProduct';

export interface ICharacteristics {
  title: string;
  property: string[];
}

export interface IType {
  _id: string;
  name: string;
  brand: IBrand[];
  characteristic: ICharacteristics[];
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface ITypeState {
  productType: IType[];
}
