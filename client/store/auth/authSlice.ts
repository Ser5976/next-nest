import { registration, login, logout, checkAuth } from './authActoins';
import { getStoreLocalStorage } from './../../utils/local-storage'; //получение данных из localStorage
import { IInitialState, IAuthResponse } from './interface.auth';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState: IInitialState = {
  isLoading: false,
  user: getStoreLocalStorage('user'), //данные по юзеру из LocalStorage
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,

  reducers: {},
  extraReducers: {
    //---регистрация---
    //период загрузки
    [registration.pending.type]: (state) => {
      state.isLoading = true;
    },
    //загружено
    [registration.fulfilled.type]: (
      state,
      action: PayloadAction<IAuthResponse>
    ) => {
      state.isLoading = false;
      state.user = action.payload?.user;
    },
    //ошибка
    [registration.rejected.type]: (state) => {
      state.isLoading = false;
      state.user = null;
    },
    //---логин---
    //период загрузки
    [login.pending.type]: (state) => {
      state.isLoading = true;
    },
    //загружено
    [login.fulfilled.type]: (state, action: PayloadAction<IAuthResponse>) => {
      state.isLoading = false;
      state.user = action.payload?.user;
    },
    //ошибка
    [login.rejected.type]: (state) => {
      state.isLoading = false;
      state.user = null;
    },
    //---логаут---
    //удаляем юзера из стейта
    [logout.fulfilled.type]: (state) => {
      state.isLoading = false;
      state.user = null;
    },
    //---проверка авторизации---

    [checkAuth.fulfilled.type]: (
      state,
      action: PayloadAction<IAuthResponse>
    ) => {
      state.user = action.payload?.user;
    },
  },
});

export default authSlice.reducer;
