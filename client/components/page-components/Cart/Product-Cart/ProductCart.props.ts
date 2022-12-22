import { DetailedHTMLProps, HTMLAttributes } from 'react';
import { ICart } from '../cart.service';

export interface ProductCartProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  productCart: ICart;
  addOrder: (product: ICart) => void;
  deleteOrder: (productId: string) => void;
}
