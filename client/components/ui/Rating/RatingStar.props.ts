import { DetailedHTMLProps, HTMLAttributes } from 'react';
export interface IRating {
  estimation: number;
  numberRatings: number;
}

export interface RatingStarProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  rating: IRating;
  readonly?: boolean; // false-можно изменить рэтинг
}
