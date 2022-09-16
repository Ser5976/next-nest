import { DetailedHTMLProps, HTMLAttributes } from 'react';

export interface INews {
  _id: string;
  name: string;
  text: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface NewsListProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  news: INews[];
}
