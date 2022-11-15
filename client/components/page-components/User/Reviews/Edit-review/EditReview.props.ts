import { IReviews } from './../../../Product-Page/product.service';
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
