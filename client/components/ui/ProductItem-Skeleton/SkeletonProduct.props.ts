import { DetailedHTMLProps, HTMLAttributes } from 'react';

export interface SkeletonProductProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  item: number;
}
