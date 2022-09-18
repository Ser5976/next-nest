import { DetailedHTMLProps, HTMLAttributes } from 'react';

export interface IStoreReviews {
  _id: string;
  name: string;
  email: string;
  text: string;
  response?: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface StoreReviewsListProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  reviews: IStoreReviews[];
}
