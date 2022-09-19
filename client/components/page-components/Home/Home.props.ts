import { INews } from '../News-List/NewsList.props';
import { DetailedHTMLProps, HTMLAttributes } from 'react';

export interface HomeProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  news: INews[];
}
