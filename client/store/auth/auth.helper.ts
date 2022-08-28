import { ITokens, IAuthResponse } from './interface.auth';
import Cookies from 'js-cookie'; //библиотека для работы с куками(запись,удаление)

// записываем токены в куки
export const saveTokensStorage = (data: IAuthResponse) => {
  Cookies.set('accessToken', data.accessToken);
  Cookies.set('refreshToken', data.refreshToken);
};
// общая функция: записываем юзера в localStorage и в куки токены
export const saveToStorage = (data: IAuthResponse) => {
  saveTokensStorage(data);
  localStorage.setItem('user', JSON.stringify(data.user));
};

//удаление токенов из куки
export const removeTokensStorage = () => {
  Cookies.remove('accessToken');
  Cookies.remove('refreshToken');
};
// обработка  сообщений ошибки
export const errorCatch = (error: any): string =>
  error.response && error.response.data
    ? typeof error.response.data.message === 'object'
      ? error.response.data.message[0]
      : error.response.data.message
    : error.message;
