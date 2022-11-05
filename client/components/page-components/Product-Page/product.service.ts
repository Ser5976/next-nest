import axios from 'axios';
import { API } from '../../../constants/url';

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

export const ProductService = {
  // получение отзывов о товаре
  async getReviews(productId: string) {
    console.log(' получен отзыв');
    const { data: reviews } = await axios.get<IReviews[]>(
      `${API.reviews}/${productId}`
    );
    return reviews;
  },
};
