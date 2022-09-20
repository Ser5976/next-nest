import { INews } from '../../News-List/NewsList.props';
import { DetailedHTMLProps, HTMLAttributes } from 'react';
import { IStoreReviews } from '../../StoreReviews-List/StoreReviewsList.props';

export interface ReviewsProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  reviews: IStoreReviews[];
}
