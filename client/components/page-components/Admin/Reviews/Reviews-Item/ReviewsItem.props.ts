import { DetailedHTMLProps, HTMLAttributes } from 'react';
import { QueryObserverResult } from 'react-query';
import { IReviewsForAdmin } from '../../admin.service';

export interface ReviewsItemProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  reviews: IReviewsForAdmin;
  openingAdminsResponse: (id: string) => void;
  refech: () => Promise<
    QueryObserverResult<
      { allReviews: IReviewsForAdmin[]; quantity: number },
      unknown
    >
  >;
}
