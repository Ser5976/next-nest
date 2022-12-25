import {
  IOrders,
  IReviewsForAdmin,
  IUsers,
} from './../../../store/admin/interface.admin';
import { API } from '../../../constants/url';
import customAxios from '../../../custom-axios/axiox-interceptors';
// некоторые интерфейсы

//интерфейс для заказов
export interface IcompletedOrder {
  orderId: string;
  bool: boolean;
}
// интерфейс слайдер
export interface ISlider {
  _id: string;
  picture: string;
  createdAt: string;
  updatedAt: string;
}

//сервис для запроса на сервак
export const AdminService = {
  // используем кастомный axios(в него уже введён токен),
  //---------Users-----------
  //получение всех пользователей
  async getUsersAdmin() {
    console.log(' получение пользователей для админа');
    const { data: usersForAdmin } = await customAxios.get<{
      users: IUsers[];
      quantity: number;
    }>(API.admin.users);
    return usersForAdmin;
  },
  //удаление пользователя
  async deleteUser(userId: string) {
    console.log(' удаление пользователя ');
    await customAxios.delete(`${API.admin.users}/${userId}`);
  },
  // поиск  пользователя по email
  async getFoundUser(email: string) {
    console.log('поиск пользователя');
    const { data: usersForAdmin } = await customAxios.get<IUsers[]>(
      API.admin.search,
      {
        params: { email },
      }
    );
    return usersForAdmin;
  },

  //----Reviews-----------
  //получение всех отзывов
  async getReviewsAdmin() {
    console.log(' получение отзывов для админа');
    const { data: reviewsForAdmin } = await customAxios.get<{
      allReviews: IReviewsForAdmin[];
      quantity: number;
    }>(API.reviews);
    return reviewsForAdmin;
  },
  // поиск  отзывов по name
  async getFoundReviews(name: string) {
    console.log('поиск отзыва');
    const { data: reviews } = await customAxios.get<IReviewsForAdmin[]>(
      API.reviewsSearch,
      {
        params: { name },
      }
    );
    return reviews;
  },
  //удаление пользователя
  async deleteReviews(reviewsId: string) {
    console.log(' удаление отзыва ');
    await customAxios.delete(`${API.reviews}/${reviewsId}`);
  },
  //----Orders-----------
  //получение всех заказов
  async getOrders() {
    console.log(' получение заказов для админа');
    const { data: ordersData } = await customAxios.get<{
      orders: IOrders[];
      quantity: number;
    }>(API.order);
    return ordersData;
  },
  // поиск  заказа по email
  async getFoundOrder(email: string) {
    console.log('поиск заказа');
    const { data: orders } = await customAxios.get<IOrders[]>(API.searchOrder, {
      params: { email },
    });
    return orders;
  },
  // выполнить заказ
  async executeAnOrder(data: IcompletedOrder) {
    console.log('исполненный заказ');
    await customAxios.put(API.order, data);
  },

  //удаление заказа
  async deleteOrder(orderId: string) {
    console.log(' удаление заказа ');
    await customAxios.delete(`${API.order}/${orderId}`);
  },
  //----Sider-----------
  //получение слайдера
  async getSlider() {
    console.log(' получение слайдера');
    const { data: sliderImages } = await customAxios.get<ISlider[]>(
      API.admin.slider
    );
    return sliderImages;
  },
  //добавление в  слайдер
  async addToSlider(url: string) {
    console.log(' добавление в слайдер слайдера');
    await customAxios.post(API.admin.slider, { picture: url });
  },
  // удаление изображения(url из базы)
  async deleteImage(imageId: string) {
    console.log(' удаление изображения ');
    await customAxios.delete(`${API.admin.slider}/${imageId}`);
  },

  // работа с файлами(загрузка изображения в сервак,где из него сделают url)
  async uploadImage(files: FormData) {
    console.log('загрузка изображения');
    const { data: urlImages } = await customAxios.post<string[]>(
      API.admin.files,
      files
    );
    return urlImages;
  },
  //удаление url изображения из папки uploads
  async removeUrl(url: string) {
    console.log(' удаление url изображения ');
    await customAxios.post(API.admin.removeUrl, { files: url });
  },
};
