import { IProduct } from '../../../Home/home.service';
import { DetailedHTMLProps, HTMLAttributes } from 'react';

export interface EstimationProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLFormElement>, HTMLFormElement> {
  product: IProduct;
}
