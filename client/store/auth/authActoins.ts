import { toast } from 'react-toastify'; //библиотечка по аллертам
import { saveToStorage, errorCatch, removeTokensStorage } from './auth.helper';
import { API } from './../../constants/url';
import { IAuth } from './../../components/page-components/Auth/interfaceAuth'; //типизация посылаемых данных из формы(email password)
import { IAuthResponse } from './interface.auth'; // типизация респонса(ответа)
import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import Cookies from 'js-cookie';

//регистрация
export const registration = createAsyncThunk(
  'auth/register',
  async (data: IAuth, thunkApp) => {
    try {
      //делаем запрос и получаем данные по регистрации
      const response = await axios.post<IAuthResponse>(API.auth.register, data);
      // общая функция: записываем юзера в localStorage и в куки токены(auth.helper)
      if (response.data.accessToken) {
        saveToStorage(response.data);
      }
      toast.success('Вы зарегистрированы'); //показываем клиенту
      return response.data;
    } catch (error: any) {
      console.log(error);
      // обработка ошибки и отправка сообщения пользователю при помощи toas
      error.response.status === 401 || error.response.status === 400 //условие, чтобы мы показали наше сосбщение написанное в бэке
        ? toast.error(errorCatch(error)) //errorCatch-функция ,которая обрабатывает сообщение ошибки(ошибка может быть в массиве или строке)
        : toast.error('Что-то пошло не так,попробуйте ещё раз'); // а это для сообщений, которые мы не обработали
      //передача ошибки в authSlice
      thunkApp.rejectWithValue(error);
    }
  }
);

//логин
export const login = createAsyncThunk(
  'auth/login',
  async (data: IAuth, thunkApp) => {
    try {
      //делаем запрос и получаем данные по авторизации
      const response = await axios.post<IAuthResponse>(API.auth.login, data);
      // общая функция: записываем юзера в localStorage и в куки токены(auth.helper)
      if (response.data.accessToken) {
        saveToStorage(response.data);
      }
      toast.success(`Здравствуйте ${response.data.user.email}!`); //показываем клиенту
      return response.data;
    } catch (error: any) {
      console.log(error);
      // обработка ошибки и отправка сообщения пользователю при помощи toas
      error.response.status === 401 || error.response.status === 400 //условие, чтобы мы показали наше сосбщение написанное в бэке
        ? toast.error(errorCatch(error)) //errorCatch-функция ,которая обрабатывает сообщение ошибки(ошибка может быть в массиве или строке)
        : toast.error('Что-то пошло не так,попробуйте ещё раз!'); // а это для сообщений, которые мы не обработали
      //передача ошибки в authSlice
      thunkApp.rejectWithValue(error);
    }
  }
);
// логаут
export const logout = createAsyncThunk('auth/logout', async () => {
  try {
    await removeTokensStorage(); //удаляем токены из куки
    await localStorage.removeItem('user'); //удаляем юзера из локал
  } catch (error: any) {
    console.log(error);
  }
});
//// проверка токена,получение нового токина, или выход из авторизации, если токен не валиден
export const checkAuth = createAsyncThunk(
  'auth/check-auth',
  async (_, thunkApp) => {
    const refreshToken = Cookies.get('refreshToken'); //получение refreshToken из куки

    try {
      //делаем запрос и получаем данные по adnjhbpfwbb
      const response = await axios.post<IAuthResponse>(API.auth.checkAuth, {
        refreshToken,
      });
      // общая функция: записываем юзера в localStorage и в куки токены(auth.helper)
      if (response.data.accessToken) {
        saveToStorage(response.data);
      }
      return response.data;
    } catch (error: any) {
      console.log(error);
      // обработка ошибки и отправка сообщения пользователю при помощи toas
      toast.error('Пожалуйства авторизируйтись занова!');
      thunkApp.dispatch(logout()); //выход из авторизации

      thunkApp.rejectWithValue(error);
    }
  }
);
