import { IStoreReviews } from './../../StoreReviews-List/store-review.service';
import { DetailedHTMLProps, HTMLAttributes } from 'react';

export interface ReviewsProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  reviews: IStoreReviews[];
}
