import { IReviews } from './../../../Product-Page/product.service';
import { IUserProfile } from './../../../../../store/user/interface.user';
import {
  DetailedHTMLProps,
  Dispatch,
  HTMLAttributes,
  SetStateAction,
} from 'react';

export interface EditReviewProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  review: IReviews;
  setOpenForm: Dispatch<SetStateAction<boolean>>;
}
