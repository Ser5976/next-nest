import { DetailedHTMLProps, HTMLAttributes } from 'react';
import { QueryObserverResult } from 'react-query';
import { ISlider } from '../../admin.service';

export interface SliderFormProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLFormElement>, HTMLFormElement> {
  refetch: () => Promise<QueryObserverResult<ISlider[], unknown>>;
}
