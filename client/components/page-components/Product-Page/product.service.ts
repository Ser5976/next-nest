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
  async getProductReviews(productId: string) {
    console.log(' получен отзыв');
    const { data: reviews } = await axios.get<IReviews[]>(
      `${API.reviews}/${productId}`
    );
    return reviews;
  },

  // поставить рейтинг товару,используем кастомный axios(в него уже введён токен)
  async putRating(ratingProduct: IRatinProduct) {
    console.log('оценка');
    const { data: result } = await customAxios.post<{ message: string }>(
      API.rating,
      ratingProduct
    );
    return result;
  },

  // добавление отзыва о товаре,используем кастомный axios(в него уже введён токен)
  async addReview(data: IAddReview) {
    console.log(' добавление отзыва');
    const { data: result } = await customAxios.post<{ message: string }>(
      API.reviews,
      data
    );
    // console.log(result);
    return result;
  },
  // удаление отзыва( админ у всех, каждый у себя)
  async removeReview(id: string) {
    console.log(' удаление отзыва');
    await customAxios.delete(`${API.reviews}/${id}`);
  },

  // добавление или если есть удаление товара из массива favourites у юзера
  async setFavourites(productId: string) {
    console.log('изменить массив избранных');
    await customAxios.put(`${API.favourites}/${productId}`);
  },
  // добавление или если есть удаление товара из массива viewed(просмотреных) у юзера
  async setViewed(productId: string) {
    console.log('изменить массив просмотренных');
    await customAxios.put(`${API.viewed}/${productId}`);
  },
};
