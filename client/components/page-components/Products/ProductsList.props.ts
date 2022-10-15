import { IType } from '../../../store/type-product/interface.typeProduct';
import { DetailedHTMLProps, HTMLAttributes } from 'react';
import { IProduct } from '../Home/home.service';

export interface IPoster {
  _id: string;
  picture: string;
  typeId: string;
  text: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface IFilteredProduct {
  allProduct: IProduct[];
  count: number;
  pageQty: number;
}

export interface ProductsListProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  typeId: string | string[] | undefined;
  productType: IType[];
  poster: IPoster | null;
}
