import { DetailedHTMLProps, HTMLAttributes } from 'react';

export interface PaginationProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  count: number | undefined;
  pageQty: number | undefined;
  page: number;
  limit: number;
}
