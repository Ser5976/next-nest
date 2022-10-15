import { IType } from '../../../../store/type-product/interface.typeProduct';
import { DetailedHTMLProps, HTMLAttributes } from 'react';
import { IProduct } from '../../Home/home.service';

export interface ProductItemProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  product: IProduct;
}
