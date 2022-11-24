import { toast } from 'react-toastify';
import { API } from './../../../constants/url';
import { INews } from '../News-List/NewsList.props';
import axios from 'axios';
import { ISlider } from '../../ui/Slider/Slider.props';
import { IStoreReviews } from '../StoreReviews-List/store-review.service';

export interface ICharacteristic {
  title: string;
  property: string;
  _id: string;
}

export interface IProduct {
  _id: string;
  name: string;
  description: string;
  characteristic: ICharacteristic[];

  rating: {
    estimation: number;
    numberRatings: number;
  };
  price: number;
  oldPrice: number;
  files: string[];
  brandId: string;
  typeId: string;
  categoryId: string;
  coundOpened: number;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

// получение новостей
export const HomeServise = {
  async getNews() {
    try {
      const { data: news } = await axios.get<INews[]>(API.news);
      return news;
    } catch (error) {
      console.log('я работаю');
      toast.error('Что-то пошло не так');
      const news: INews[] = [];
      return news;
    }
  },
  // получение отзывов о магазине
  async getStoreReviews() {
    try {
      const { data: reviews } = await axios.get<IStoreReviews[]>(
        API.storeReviews
      );
      return reviews;
    } catch (error) {
      console.log('я работаю');
      toast.error('Что-то пошло не так');
      const reviews: IStoreReviews[] = [];
      return reviews;
    }
  },
  //получение слайдера
  async getSlider() {
    try {
      const { data: slier } = await axios.get<ISlider[]>(API.slider);
      return slier;
    } catch (error) {
      const slider: ISlider[] = [];
      return slider;
    }
  },
  //получение популярных продуктов
  async getPopular() {
    try {
      const { data: popular } = await axios.get<IProduct[]>(
        API.products.popular
      );
      return popular;
    } catch (error) {
      const popular: IProduct[] = [];
      return popular;
    }
  },
};
