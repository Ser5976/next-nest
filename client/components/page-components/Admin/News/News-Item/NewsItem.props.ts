import { INews } from './../../../News-List/NewsList.props';
import {
  DetailedHTMLProps,
  Dispatch,
  HTMLAttributes,
  SetStateAction,
} from 'react';
import { QueryObserverResult } from 'react-query';

export interface NewsItemProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  news: INews;
  setSelectedNews: Dispatch<SetStateAction<INews | ''>>;
  setShow: Dispatch<SetStateAction<boolean>>;
  refech: () => Promise<QueryObserverResult<INews[], unknown>>;
}
