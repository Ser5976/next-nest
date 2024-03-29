import { IStoreReviews } from './../StoreReviews-List/store-review.service';
import { IProduct } from './home.service';
import { ISlider } from './../../ui/Slider/Slider.props';
import { INews } from '../News-List/NewsList.props';
import { DetailedHTMLProps, HTMLAttributes } from 'react';

export interface HomeProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  news: INews[];
  reviews: IStoreReviews[];
  sliders: ISlider[];
  popular: IProduct[];
}
