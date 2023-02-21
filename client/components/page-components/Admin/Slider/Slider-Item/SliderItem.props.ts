import { DetailedHTMLProps, HTMLAttributes } from 'react';
import { QueryObserverResult } from 'react-query';
import { ISlider } from '../../admin.service';

export interface SliderItemProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  slider: ISlider[] | undefined;
  refetch: () => Promise<QueryObserverResult<ISlider[], unknown>>;
}
