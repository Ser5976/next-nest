import { DetailedHTMLProps, HTMLAttributes } from 'react';
import { QueryObserverResult } from 'react-query';
import { IPoster } from '../../../admin.service';

export interface PosterFormProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLFormElement>, HTMLFormElement> {
  poster: IPoster;
  refetch: () => Promise<QueryObserverResult<IPoster[], unknown>>;
}
