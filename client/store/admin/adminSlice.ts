import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getStoreLocalStorage } from '../../utils/local-storage';
import { IAdminInitialState } from './interface.admin';

const initialState: IAdminInitialState = {
  userQuantity: getStoreLocalStorage('userQuntity'), //данные по количеству пользователей, из LocalStorage
  reviewsQuantity: getStoreLocalStorage('reviewsQuantity'), //данные по количеству отзывов, из LocalStorage
  ordersQuantity: getStoreLocalStorage('ordersQuantity'), //данные по количеству заказов, из LocalStorage
  freshOrdersQuantity: getStoreLocalStorage('freshOrdersQuantity'), //данные по количеству заказов, из LocalStorage
  freshReviewsQuantity: getStoreLocalStorage('freshReviewsQuantity'), //данные по количеству заказов, из LocalStorage
  productsQuantity: getStoreLocalStorage('productsQuantity'), //данные по количеству товаров, из LocalStorage
};

export const adminSlice = createSlice({
  name: 'admin',
  initialState,

  reducers: {
    //...Users.....
    getUserQuantity: (state, action: PayloadAction<number>) => {
      state.userQuantity = action.payload;
      localStorage.setItem('userQuntity', JSON.stringify(action.payload));
    },
    //...Reviews.....
    getReviewsQuantity: (state, action: PayloadAction<number>) => {
      state.reviewsQuantity = action.payload;
      localStorage.setItem('reviewsQuantity', JSON.stringify(action.payload));
    },
    getFreshReviewsQuantity: (state, action: PayloadAction<number>) => {
      state.freshReviewsQuantity = action.payload;
      localStorage.setItem(
        'freshReviewsQuantity',
        JSON.stringify(action.payload)
      );
    },
    //...Orders.....
    getOrdersQuantity: (state, action: PayloadAction<number>) => {
      state.ordersQuantity = action.payload;
      localStorage.setItem('ordersQuantity', JSON.stringify(action.payload));
    },
    getFreshOrdersQuantity: (state, action: PayloadAction<number>) => {
      state.freshOrdersQuantity = action.payload;
      localStorage.setItem(
        'freshOrdersQuantity',
        JSON.stringify(action.payload)
      );
    },
    //...Products.....
    getProductsQuantity: (state, action: PayloadAction<number>) => {
      state.productsQuantity = action.payload;
      localStorage.setItem('productsQuantity', JSON.stringify(action.payload));
    },
  },
});
export const {
  getOrdersQuantity,
  getUserQuantity,
  getReviewsQuantity,
  getFreshOrdersQuantity,
  getFreshReviewsQuantity,
  getProductsQuantity,
} = adminSlice.actions;
export default adminSlice.reducer;
