import { IType } from './../../../store/type-product/interface.typeProduct';
import { DetailedHTMLProps, HTMLAttributes } from 'react';
import { IProduct } from '../Home/home.service';

export interface IFilteredProduct {
  allProduct: IProduct[];
  count: number;
  pageQty: number;
}

export interface ProductTypeProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  product: IFilteredProduct;
  type: string | string[] | undefined;
  productType: IType[];
}
