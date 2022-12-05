import { DetailedHTMLProps, HTMLAttributes } from 'react';
import { ICart } from '../cart.service';

export interface ProductCartProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  productCart: ICart;
  addOrder: (cartId: string) => void;
  deleteOrder: (cartId: string) => void;
}
