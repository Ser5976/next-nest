import { IType } from './../../../store/type-product/interface.typeProduct';
import { IProduct } from './../Home/home.service';
import { DetailedHTMLProps, HTMLAttributes } from 'react';

export interface ProductPageProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  product: IProduct;
  productType: IType[];
}
