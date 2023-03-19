import { toast } from 'react-toastify'; //библиотечка по аллертам
import { errorCatch } from './auth.helper';
import { IAuth } from './../../components/page-components/Auth/interfaceAuth'; //типизация посылаемых данных из формы(email password)
import { createAsyncThunk } from '@reduxjs/toolkit';
import { AuthService } from './auth.service'; //сервисы запросов на бэкэнд (авторизация)

//регистрация
export const registration = createAsyncThunk(
  'auth/register',
  async (data: IAuth, thunkApp) => {
    try {
      // получаем данные по регистрации
      const response = await AuthService.register(data);

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
      const response = await AuthService.login(data);

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
//удаляем токены из куки,удаляем юзера из локал
export const logout = createAsyncThunk('auth/logout', async () => {
  await AuthService.logout();
});
// проверка токена,получение нового токина, или выход из авторизации, если токен не валиден
export const checkAuth = createAsyncThunk(
  'auth/check-auth',
  async (_, thunkApp) => {
    try {
      //делаем запрос и получаем данные по авторизации
      const response = await AuthService.getNewTokens(); //получем refresh из куки,делаем запрос,
      //проверяем refresh , обновляем токены и записываем в куки и юзера в локал
      return response.data;
    } catch (error: any) {
      // обработка ошибки и отправка сообщения пользователю при помощи toas
      toast.error('Пожалуйства авторизируйтись занова!');
      thunkApp.dispatch(logout()); //выход из авторизации
      thunkApp.rejectWithValue(error);
    }
  }
);
