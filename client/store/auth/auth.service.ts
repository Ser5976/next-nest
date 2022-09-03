import axios from 'axios';
import Cookies from 'js-cookie';
import { API } from '../../constants/url';
import { IAuth } from './../../components/page-components/Auth/interfaceAuth'; //типизация данных для авторизации:email,password
import { IAuthResponse } from './interface.auth'; // типизация респонса(ответа)
import { removeTokensStorage, saveToStorage } from './auth.helper';

//делаем запросы для аторизации
//регистрация
export const AuthService = {
  async register(data: IAuth) {
    const response = await axios.post<IAuthResponse>(API.auth.register, data);

    if (response.data.accessToken) {
      saveToStorage(response.data);
    }
    return response;
  },
  //логин
  async login(data: IAuth) {
    const response = await axios.post<IAuthResponse>(API.auth.login, data);

    if (response.data.accessToken) {
      saveToStorage(response.data);
    }
    return response;
  },
  //выход из системы
  logout() {
    removeTokensStorage(); //удаление токенов из куки
    localStorage.removeItem('user'); // удаление юзера из localStorage
  },
  // проверка токена,получение нового токина, или выход из авторизации, если токен не валиден
  async getNewTokens() {
    const refreshToken = Cookies.get('refreshToken');
    const response = await axios.post<IAuthResponse>(API.auth.checkAuth, {
      refreshToken,
    });

    // общая функция: записываем юзера в localStorage и в куки токены(auth.helper)
    if (response.data.accessToken) {
      saveToStorage(response.data);
    }

    return response;
  },
};
