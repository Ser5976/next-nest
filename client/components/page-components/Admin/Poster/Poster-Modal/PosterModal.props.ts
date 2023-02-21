import {
  DetailedHTMLProps,
  HTMLAttributes,
  Dispatch,
  SetStateAction,
} from 'react';
import { QueryObserverResult } from 'react-query';
import { IPoster } from '../../admin.service';

export interface PosterModalProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  show: boolean;
  setShow: Dispatch<SetStateAction<boolean>>;
  poster: IPoster;
  refetch: () => Promise<QueryObserverResult<IPoster[], unknown>>;
}
