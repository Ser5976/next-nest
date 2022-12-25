import { DetailedHTMLProps, HTMLAttributes } from 'react';

export interface ISlider {
  _id: string;
  picture: string;
  createdAt: string;
  updatedAt: string;
  __v: 0;
}

export interface SliderProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  sliders: ISlider[];
}
