import { DetailedHTMLProps, HTMLAttributes } from 'react';

export interface SortProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  rating: boolean;
  priceDown: boolean;
  priceUp: boolean;
  toggleRating: () => void;
  toogglePrice: () => void;
}
