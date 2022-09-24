import { DetailedHTMLProps, HTMLAttributes } from 'react';
import { ISlider } from '../Slider.props';

export interface SliderItemProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  slider: ISlider;
}
