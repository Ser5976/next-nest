import { DetailedHTMLProps, HTMLAttributes } from 'react';
import { ICart } from '../../Cart/cart.service';

export interface ProductsOrderProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  products: ICart[];
}
