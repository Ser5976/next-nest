import { IPersonalData } from './../../../store/user/interface.user';
import axios from 'axios';
import { API } from '../../../constants/url';
import customAxios from '../../../custom-axios/axiox-interceptors';

//сервис для запроса на сервак
export interface IEditReview {
  reviewId: string;
  text: string;
}

export const UserService = {
  // редактирование отзыва юзером,используем кастомный axios(в него уже введён токен)
  async editReview(data: IEditReview) {
    console.log(' редактирование отзыва');
    await customAxios.put(`${API.reviews}/${data.reviewId}`, {
      text: data.text,
    });
  },
  // редактирование личных данных юзера
  async editPersonalData(data: IPersonalData) {
    console.log(' редактирование личных данных');
    await customAxios.put(API.personalData, data);
  },
  // редактирование email юзера
  async editEmail(data: { email: string; password: string }) {
    console.log(' редактирование email');
    await customAxios.put(API.email, data);
  },
  // редактирование password юзера
  async editPassword(data: { currentPassword: string; password: string }) {
    console.log(' редактирование password');
    await customAxios.put(API.password, data);
  },
};
