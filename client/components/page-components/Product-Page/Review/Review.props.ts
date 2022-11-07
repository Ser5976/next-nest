import { IReviews } from '../product.service';
import { DetailedHTMLProps, HTMLAttributes } from 'react';

export interface ReviewProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  review: IReviews[] | undefined;
}
