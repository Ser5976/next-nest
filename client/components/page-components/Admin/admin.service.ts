import { ICategoryProduct } from './../../../store/category-product/interface.categoryProduct';
import {
  IOrders,
  IReviewsForAdmin,
  IUsers,
} from './../../../store/admin/interface.admin';
import { API } from '../../../constants/url';
import customAxios from '../../../custom-axios/axiox-interceptors';
import { IType } from '../../../store/type-product/interface.typeProduct';
import { ICategory, ITypes } from '../../../header-service/header.service';

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
// интерфейс постер
export interface IPoster {
  _id: string;
  picture: string;
  typeId: IType;
}
export interface IAddPoster {
  picture: string;
  typeId: string;
}
//интерфейс редактирование постера
export interface IUpdatePoster {
  picture: string;
  posterId: string | undefined;
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
    const deleteFile = await customAxios.delete<ISlider>(
      `${API.admin.slider}/${imageId}`
    );
    return deleteFile;
  },

  // работа с файлами(загрузка изображения на сервак,где из него сделают url)
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
  //----Poster-----------
  //создание постера
  async createPoster(data: IAddPoster) {
    console.log(' создание  постера');
    const { data: poster } = await customAxios.post<IPoster>(
      API.admin.poster,
      data
    );
    return poster;
  },
  //получение постеров
  async getPoster() {
    console.log(' получение постеров');
    const { data: getPosters } = await customAxios.get<IPoster[]>(
      API.admin.poster
    );
    return getPosters;
  },
  // поиск  постера по name
  async getFoundPoster(name: string) {
    console.log('поиск типа');
    const { data: searchPosters } = await customAxios.get<IPoster[]>(
      API.admin.searchPoster,
      {
        params: { name },
      }
    );
    return searchPosters;
  },
  // редактирование  постера
  async updatePoster(data: IUpdatePoster) {
    console.log('обновление постера');
    const { data: updatePoster } = await customAxios.put<{ message: string }>(
      API.admin.poster,
      data
    );
    return updatePoster;
  },
  //удаление постера
  async deletePoster(posterId: string) {
    console.log(' удаление постера ');
    const message = await customAxios.delete<{ message: string }>(
      `${API.admin.poster}/${posterId}`
    );
    return message;
  },
  //----CategoryProduct-----------
  //добавление категории
  async addCategoryProduct(data: { name: string }) {
    console.log(' добавление категории ');
    await customAxios.post(API.categoryProduct, data);
  },
  //получение категорий товара
  async getCategoryProduct() {
    console.log(' получение категорий для админа');
    const { data: categoryP } = await customAxios.get<ICategory>(
      API.categoryProduct
    );
    return categoryP;
  },
  // поиск  категории по name
  async getFoundCategory(name: string) {
    console.log('поиск категории');
    const { data: categorySearch } = await customAxios.get<ICategoryProduct[]>(
      API.admin.searchCategory,
      {
        params: { name },
      }
    );
    return categorySearch;
  },

  //удаление категории
  async deleteCategory(categoryProdutId: string) {
    console.log(' удаление категории ');
    const message = await customAxios.delete<{ message: string }>(
      `${API.categoryProduct}/${categoryProdutId}`
    );
    return message;
  },
  //----ProductType-----------
  //добавление типа
  async addProductType(data: { name: string }) {
    console.log(' добавление типа ');
    await customAxios.post(API.productType, data);
  },
  //получение типа товара
  async getProductType() {
    console.log(' получение типа для админа');
    const { data: productsTypes } = await customAxios.get<ITypes>(
      API.productType
    );
    return productsTypes;
  },
  // поиск  типа по name
  async getFoundType(name: string) {
    console.log('поиск типа');
    const { data: typeSearch } = await customAxios.get<IType[]>(
      API.admin.searchType,
      {
        params: { name },
      }
    );
    return typeSearch;
  },

  //удаление типа
  async deleteType(produtTypeId: string) {
    console.log(' удаление типа ');
    const remoteType = await customAxios.delete<IType>(
      `${API.productType}/${produtTypeId}`
    );
    return remoteType;
  },
};
