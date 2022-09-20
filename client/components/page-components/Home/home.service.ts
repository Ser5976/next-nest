import { toast } from 'react-toastify';
import { API } from './../../../constants/url';
import { INews } from '../News-List/NewsList.props';
import axios from 'axios';
import { IStoreReviews } from '../StoreReviews-List/StoreReviewsList.props';

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
  async getReviews() {
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
};
