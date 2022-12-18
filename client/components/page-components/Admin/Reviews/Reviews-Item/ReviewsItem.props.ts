import { IReviewsForAdmin } from './../../../../../store/admin/interface.admin';
import { DetailedHTMLProps, HTMLAttributes } from 'react';

export interface ReviewsItemProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  reviews: IReviewsForAdmin;
  openingAdminsResponse: (id: string) => void;
}
