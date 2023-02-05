import {
  DetailedHTMLProps,
  Dispatch,
  HTMLAttributes,
  SetStateAction,
} from 'react';
import { QueryObserverResult } from 'react-query';
import { IArticle } from '../../../../../store/customers/interface.customers';

export interface ArticleItemProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  article: IArticle;
  setArticle: Dispatch<SetStateAction<IArticle | ''>>;
  setShow: Dispatch<SetStateAction<boolean>>;
  refetch: () => Promise<QueryObserverResult<IArticle[], unknown>>;
}
