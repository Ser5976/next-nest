import { DetailedHTMLProps, HTMLAttributes } from 'react';

export interface PaginationProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  count: number;
  pageQty: number;
  type: string | string[] | undefined;
  filter?: string | string[] | undefined;
  selectedPath?: 'page' | 'filter';
}
