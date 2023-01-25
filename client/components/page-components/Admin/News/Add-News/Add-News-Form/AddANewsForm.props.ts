import { INews } from '../../../../News-List/NewsList.props';
import {
  DetailedHTMLProps,
  Dispatch,
  HTMLAttributes,
  SetStateAction,
} from 'react';
import { QueryObserverResult } from 'react-query';

export interface AddNewsFormProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLFormElement>, HTMLFormElement> {
  selectedNews: INews | '';
  setShow: Dispatch<SetStateAction<boolean>>;
  refech: () => Promise<QueryObserverResult<INews[], unknown>>;
}
