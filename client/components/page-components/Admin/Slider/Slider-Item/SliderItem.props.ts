import {
  DetailedHTMLProps,
  HTMLAttributes,
  Dispatch,
  SetStateAction,
} from 'react';
import { ISlider } from '../../admin.service';

export interface SliderItemProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  slider: ISlider[] | undefined;
  setImages: Dispatch<SetStateAction<ISlider[] | undefined>>;
}
