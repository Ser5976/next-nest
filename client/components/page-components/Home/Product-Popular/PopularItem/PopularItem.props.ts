import { IProduct } from '../../home.service';
import { DetailedHTMLProps, HTMLAttributes } from 'react';

export interface PopularItemProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  popular: IProduct;
}
