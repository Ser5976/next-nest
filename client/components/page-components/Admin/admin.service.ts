import { IProduct } from './../Home/home.service';
import { INews } from './../News-List/NewsList.props';
import { ICategoryProduct } from './../../../store/category-product/interface.categoryProduct';
import { API } from '../../../constants/url';
import customAxios from '../../../custom-axios/axiox-interceptors';
import { IType } from '../../../store/type-product/interface.typeProduct';
import { IArticle } from '../../../store/customers/interface.customers';
import { ICart } from '../Cart/cart.service';
import {
  IAddress,
  IPersonalData,
  IPhone,
} from '../../../store/user/interface.user';

// жуть, получился здоровый файл
// все сервисы  запросов для админки и некоторые интерфейсы,корява нооо как есть

// некоторые интерфейсы
//для пользователей
export interface IUsers {
  _id: string;
  email: string;
  isAdmin: boolean;
  phone: IPhone;
  personalData: IPersonalData;
  address: IAddress;
  createdAt: string;
  updatedAt: string;
}
// для клиентов
export interface IAddArticle {
  title: string;
  description: string;
  slug: string;
}
export interface IUpdateArticle {
  id: string;
  data: IAddArticle;
}
// для новостей
export interface IAddNews {
  name: string;
  text: string;
}
export interface IUpdateNews {
  id: string;
  data: IAddNews;
}
//интерфейс для заказов
export interface IcompletedOrder {
  orderId: string;
  bool: boolean;
}
export interface IOrders {
  _id: string;
  productCart: ICart[];
  user: IUsers;
  name: string;
  email: string;
  address: IAddress;
  delivery: string;
  payment: string;
  telephone: string;
  orderAmount: number;
  execution: boolean;
  createdAt: string;
  updatedAt: string;
  __v: number;
}
// для отзывов
export interface IReviewsForAdmin {
  _id: string;
  userId: IUsers;
  productId?: string;
  store?: string;
  name: string;
  response: string;
  text: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
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
// интерфейс брэнд
export interface IBrand {
  _id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
}

//сервис для запроса на сервак, не используем try/catch для отлова ошибок
//т.к. все сервисы буду использоваться в react-query, а он сам разберётся с ошибкой
// это объект с методами
export const AdminService = {
  // используем кастомный axios(в него уже введён токен),
  //---------Users-----------
  //получение всех пользователей или выбранного
  async getUsersAdmin(email: string) {
    console.log(' получение пользователей для админа');
    const { data: usersForAdmin } = await customAxios.get<{
      users: IUsers[];
      quantity: number;
    }>(API.admin.users, {
      params: { email },
    });
    return usersForAdmin;
  },
  //удаление пользователя
  async deleteUser(userId: string) {
    console.log(' удаление пользователя ');
    await customAxios.delete(`${API.admin.users}/${userId}`);
  },

  //----Reviews-----------
  //получение(или поиск по name) всех отзывов
  async getReviewsAdmin(name: string) {
    console.log(' получение отзывов для админа');
    const { data: reviewsForAdmin } = await customAxios.get<{
      allReviews: IReviewsForAdmin[];
      quantity: number;
    }>(API.reviews, {
      params: { name },
    });
    return reviewsForAdmin;
  },

  //удаление озыва
  async deleteReviews(reviewsId: string) {
    console.log(' удаление отзыва ');
    await customAxios.delete(`${API.reviews}/${reviewsId}`);
  },
  //----Orders-----------
  //получение(или поиск) всех заказов
  async getOrders(email: string) {
    console.log(' получение заказов для админа');
    const { data: ordersData } = await customAxios.get<{
      orders: IOrders[];
      quantity: number;
    }>(API.order, {
      params: { email },
    });
    return ordersData;
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
  async removeUrl(url: string | string[]) {
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
  async getCategoryProduct(name: string) {
    console.log(' получение категорий для админа');
    const { data: categoryProduct } = await customAxios.get<ICategoryProduct[]>(
      API.categoryProduct,
      {
        params: { name },
      }
    );
    return categoryProduct;
  },
  //удаление категории
  async deleteCategory(categoryProdutId: string) {
    console.log(' удаление категории ');
    const removeCategoryProduct = await customAxios.delete<ICategoryProduct>(
      `${API.categoryProduct}/${categoryProdutId}`
    );
    return removeCategoryProduct;
  },
  //----ProductType-----------
  //добавление типа
  async addProductType(data: { name: string }) {
    console.log(' добавление типа ');
    await customAxios.post(API.productType, data);
  },
  //получение(и поиск) типа товара
  async getProductType(name: string) {
    console.log(' получение типа для админа');
    const { data: productsTypes } = await customAxios.get<IType[]>(API.productType, {
      params: { name },
    });
    return productsTypes;
  },

  //удаление типа
  async deleteType(produtTypeId: string) {
    console.log(' удаление типа ');
    const remoteType = await customAxios.delete<IType>(
      `${API.productType}/${produtTypeId}`
    );
    return remoteType;
  },
  //----Brand-----------
  //добавление брэнда
  async addBrand(data: { name: string }) {
    console.log(' добавление брэнда ');
    await customAxios.post(API.admin.brand, data);
  },
  //получение или поиск брэнда
  async getBrand(searchBrand: string) {
    console.log(' получение брэнда');
    const { data: brands } = await customAxios.get<IBrand[]>(API.admin.brand, {
      params: { name: searchBrand },
    });
    return brands;
  },

  //удаление брэнда
  async deleteBrand(brandId: string) {
    console.log(' удаление бранда ');
    const remoteBrand = await customAxios.delete<IBrand>(
      `${API.admin.brand}/${brandId}`
    );
    return remoteBrand;
  },
  //----for-customers-----------
  //добавление статьи
  async addArticle(data: IAddArticle) {
    console.log(' добавление статьи ');
    const article = await customAxios.post(API.customers, data);
    return article;
  },
  //получение статей
  async getArticles() {
    console.log(' получение статей');
    const { data: articles } = await customAxios.get<IArticle[]>(API.customers);
    return articles;
  },
  //редактирование статьи
  async updateArticle(data: IUpdateArticle) {
    console.log(' редактирование статьи ');
    await customAxios.put(`${API.customers}/${data.id}`, data.data);
  },

  //удаление статьи
  async deleteArticle(articleId: string) {
    console.log(' удаление статьи ');
    const article = await customAxios.delete<IArticle>(
      `${API.customers}/${articleId}`
    );
    return article;
  },
  //----news-----------
  //добавление новости
  async addNews(data: IAddNews) {
    console.log(' добавление новости ');
    const news = await customAxios.post(API.news, data);
    return news;
  },
  //получение(или поиск) новостей
  async getNews(name: string) {
    console.log(' получение новостей');
    const { data: news } = await customAxios.get<INews[]>(API.news, {
      params: { name },
    });
    return news;
  },
  //редактирование новости
  async updateNews(data: IUpdateNews) {
    console.log(' редактирование новости ');
    await customAxios.put(`${API.news}/${data.id}`, data.data);
  },

  //удаление новости
  async deleteNews(newsId: string) {
    console.log(' удаление новости ');
    const news = await customAxios.delete<INews>(`${API.news}/${newsId}`);
    return news;
  },
  //----products-----------
  //добавление товара
  async addProduct(
    data: Omit<IProduct, '_id' | '_v' | 'createdAt' | 'updatedAt' | 'rating'>
  ) {
    console.log(' добавление товара ');
    const product = await customAxios.post(API.product, data);
    return product;
  },
  //получение(или поиск) товара
  async getProducts(name: string) {
    console.log(' получение товаров');
    const { data: dataProducts } = await customAxios.get<{
      products: IProduct[];
      quantity: number;
    }>(API.product, {
      params: { name },
    });
    return dataProducts;
  },
  //редактирование товара
  async updateProduct(data: {
    product: Omit<
      IProduct,
      '_id' | '_v' | 'createdAt' | 'updatedAt' | 'rating'
    >;
    productId: string;
  }) {
    console.log(' редактирование товара ');
    await customAxios.put(`${API.product}/${data.productId}`, data.product);
  },

  //удаление товара
  async deleteProduct(productId: string) {
    console.log(' удаление товара ');
    const news = await customAxios.delete<INews>(`${API.product}/${productId}`);
    return news;
  },
};
