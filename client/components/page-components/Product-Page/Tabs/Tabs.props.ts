import { IProduct } from './../../Home/home.service';
import { DetailedHTMLProps, HTMLAttributes } from 'react';

export interface TabsProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  product: IProduct;
}
