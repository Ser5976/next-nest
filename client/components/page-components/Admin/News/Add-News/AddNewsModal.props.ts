import { INews } from './../../../News-List/NewsList.props';
import {
  DetailedHTMLProps,
  HTMLAttributes,
  Dispatch,
  SetStateAction,
} from 'react';
import { QueryObserverResult } from 'react-query';

export interface AddNewsModalProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  selectedNews: INews | '';
  setSelectedNews: Dispatch<SetStateAction<INews | ''>>;
  show: boolean;
  setShow: Dispatch<SetStateAction<boolean>>;
  refech: () => Promise<QueryObserverResult<INews[], unknown>>;
}
