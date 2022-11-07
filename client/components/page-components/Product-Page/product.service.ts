import { toast } from 'react-toastify';
import axios from 'axios';
import { API } from '../../../constants/url';
import customAxios from '../../../custom-axios/axiox-interceptors';
import { IAddReview } from './Review-Form/ReviewForm';

//сервис для запроса на сервак
export interface IReviews {
  _id: string;
  userId: string;
  productId: string;
  name: string;
  text: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}
export interface IRatinProduct {
  productId: string;
  value: number;
}

export const ProductService = {
  // получение отзывов о товаре
  async getReviews(productId: string) {
    console.log(' получен отзыв');
    const { data: reviews } = await axios.get<IReviews[]>(
      `${API.reviews}/${productId}`
    );
    return reviews;
  },

  // поставить рейтинг товару
  async putRating(ratingProduct: IRatinProduct) {
    console.log(' отправка отзыва');
    const { data: result } = await customAxios.post<{ message: string }>(
      API.rating,
      ratingProduct
    );
    return result;
  },

  // добавление отзыва о товаре,используем кастомные axios(в него уже введён токен)
  async addReview(data: IAddReview) {
    console.log(' отправка отзыва');
    const { data: result } = await customAxios.post<{ message: string }>(
      API.reviews,
      data
    );
    // console.log(result);
    return result;
  },
  // удаление отзыва(только админ)
  async removeReview(id: string) {
    console.log(' отправка отзыва');
    await customAxios.delete(`${API.reviews}/${id}`);
  },
};
