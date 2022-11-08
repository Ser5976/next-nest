import { IProduct } from './../../Home/home.service';
import { IReviews } from '../product.service';
import { DetailedHTMLProps, HTMLAttributes } from 'react';

export interface FavouritesProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  product: IProduct;
}
