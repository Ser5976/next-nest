import { IProduct } from './../home.service';
import { DetailedHTMLProps, HTMLAttributes } from 'react';

export interface ProductPopularProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  popular: IProduct[];
}
