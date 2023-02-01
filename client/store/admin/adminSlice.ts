import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getStoreLocalStorage } from '../../utils/local-storage';
import { IAdminInitialState } from './interface.admin';

const initialState: IAdminInitialState = {
  userQuantity: getStoreLocalStorage('userQuntity'), //данные по количеству пользователей, из LocalStorage
  reviewsQuantity: getStoreLocalStorage('reviewsQuantity'), //данные по количеству отзывов, из LocalStorage
  ordersQuantity: getStoreLocalStorage('reviewsQuantity'), //данные по количеству заказов, из LocalStorage
};

export const adminSlice = createSlice({
  name: 'admin',
  initialState,

  reducers: {
    //...Users.....
    getUserQantity: (state, action: PayloadAction<number>) => {
      state.userQuantity = action.payload;
      localStorage.setItem('userQuntity', JSON.stringify(action.payload));
    },
    //...Reviews.....
    getReviewsQantity: (state, action: PayloadAction<number>) => {
      state.reviewsQuantity = action.payload;
      localStorage.setItem('reviewsQuantity', JSON.stringify(action.payload));
    },
    //...Orders.....
    getOrdersQantity: (state, action: PayloadAction<number>) => {
      state.ordersQuantity = action.payload;
      localStorage.setItem('reviewsQuantity', JSON.stringify(action.payload));
    },
  },
});
export const { getOrdersQantity, getUserQantity, getReviewsQantity } =
  adminSlice.actions;
export default adminSlice.reducer;
