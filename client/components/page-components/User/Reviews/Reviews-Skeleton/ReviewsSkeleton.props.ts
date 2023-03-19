import { DetailedHTMLProps, HTMLAttributes } from 'react';

export interface ReviewsSkeletonProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  item: number;
}
