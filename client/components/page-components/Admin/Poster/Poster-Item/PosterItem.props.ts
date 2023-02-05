import { DetailedHTMLProps, HTMLAttributes } from 'react';
import { QueryObserverResult } from 'react-query';
import { IPoster } from '../../admin.service';

export interface PosterItemProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  poster: IPoster;
  refetch: () => Promise<QueryObserverResult<IPoster[], unknown>>;
}
