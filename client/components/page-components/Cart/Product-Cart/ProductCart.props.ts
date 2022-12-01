import { DetailedHTMLProps, HTMLAttributes } from 'react';
import { ICart } from '../cart.service';

export interface ProductCartProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  product: ICart;
}
