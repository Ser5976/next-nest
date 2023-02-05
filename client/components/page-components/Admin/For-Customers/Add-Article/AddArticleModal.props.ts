import {
  DetailedHTMLProps,
  HTMLAttributes,
  Dispatch,
  SetStateAction,
} from 'react';
import { QueryObserverResult } from 'react-query';
import { IArticle } from '../../../../../store/customers/interface.customers';

export interface AddArticleModalProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  article: IArticle | '';
  setArticle: Dispatch<SetStateAction<IArticle | ''>>;
  show: boolean;
  setShow: Dispatch<SetStateAction<boolean>>;
  refetch: () => Promise<QueryObserverResult<IArticle[], unknown>>;
}
