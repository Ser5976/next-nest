import { DetailedHTMLProps, HTMLAttributes } from 'react';
import { IPoster } from '../../../admin.service';

export interface PosterFormProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLFormElement>, HTMLFormElement> {
  poster: IPoster;
}
