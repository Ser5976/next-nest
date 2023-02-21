import {
  DetailedHTMLProps,
  Dispatch,
  HTMLAttributes,
  SetStateAction,
} from 'react';
import { QueryObserverResult } from 'react-query';
import { IArticle } from '../../../../../../store/customers/interface.customers';

export interface AddArticleFormProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLFormElement>, HTMLFormElement> {
  article: IArticle | '';
  setShow: Dispatch<SetStateAction<boolean>>;
  refetch: () => Promise<QueryObserverResult<IArticle[], unknown>>;
}
