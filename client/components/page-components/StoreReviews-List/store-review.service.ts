import axios from 'axios';
import { API } from '../../../constants/url';
import customAxios from '../../../custom-axios/axiox-interceptors';

export interface IStoreReviews {
  _id: string;
  userId: string;
  store: string;
  name: string;
  text: string;
  response: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}
export interface IAddStoreReview {
  name: string;
  text: string;
  store: string;
}
export interface IRensponse {
  response: string;
  reviewId: string;
}

//сервис для запроса на сервак

export const StoreReviewService = {
  // получение отзывов о магазине
  async getStoreReviews() {
    console.log(' получены отзывы о магазине');
    const { data: storeReviews } = await axios.get<IStoreReviews[]>(
      `${API.storeReviews}`
    );
    return storeReviews;
  },

  // добавление отзыва о магазине,используем кастомный axios(в него уже введён токен)
  async addStoreReview(data: IAddStoreReview) {
    console.log(' добавление отзыва');
    const { data: result } = await customAxios.post<{ message: string }>(
      API.reviews,
      data
    );
    // console.log(result);
    return result;
  },
  // удаление отзыва ( админ у всех, каждый у себя) смотри product.service

  // админ ответ на отзыв
  async responseReview(data: IRensponse) {
    console.log(' ответ на  отзыв');
    await customAxios.put(`${API.responseReview}/${data.reviewId}`, {
      response: data.response,
    });
  },
};
