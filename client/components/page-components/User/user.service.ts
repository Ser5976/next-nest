import {
  IPersonalData,
  IPhone,
  IAddress,
} from './../../../store/user/interface.user';
import { API } from '../../../constants/url';
import customAxios from '../../../custom-axios/axiox-interceptors';

export interface IEditReview {
  reviewId: string;
  text: string;
}
//сервис для запроса на сервак
export const UserService = {
  //а удаление отзыва сервис в ProductService removeReview

  // редактирование отзыва юзером,используем кастомный axios(в него уже введён токен),
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
  // редактирование телефона юзера
  async editPhone(data: IPhone) {
    console.log(' редактирование телефона');
    await customAxios.put(API.phone, data);
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
  // редактирование адреса юзера
  async editAddress(data: IAddress) {
    console.log(' редактирование адреса');
    await customAxios.put(API.address, data);
  },
};
