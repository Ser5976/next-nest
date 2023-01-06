import { DetailedHTMLProps, HTMLAttributes } from 'react';
import { IPoster } from '../../admin.service';

export interface PosterItemProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  poster: IPoster;
}
