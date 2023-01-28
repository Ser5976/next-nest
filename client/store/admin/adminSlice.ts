import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getStoreLocalStorage } from '../../utils/local-storage';
import {
  IAdminInitialState,
  IReviewsForAdmin,
  IOrders,
} from './interface.admin';

const initialState: IAdminInitialState = {
  userQuantity: getStoreLocalStorage('userQuntity'), //данные по количеству пользователей, из LocalStorage
  generalReviewsForAdmin: {
    reviewsForAdmin: {} as { allReviews: IReviewsForAdmin[]; quantity: number },
  },
  orders: { ordersData: {} as { orders: IOrders[]; quantity: number } },
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
    getReviewsForAdmin: (
      state,
      action: PayloadAction<{
        allReviews: IReviewsForAdmin[];
        quantity: number;
      }>
    ) => {
      state.generalReviewsForAdmin.reviewsForAdmin = action.payload;
    },
    searchReviews: (state, action: PayloadAction<IReviewsForAdmin[]>) => {
      state.generalReviewsForAdmin.reviewsForAdmin.allReviews = action.payload;
    },
    //...Orders.....
    getOrders: (
      state,
      action: PayloadAction<{
        orders: IOrders[];
        quantity: number;
      }>
    ) => {
      state.orders.ordersData = action.payload;
    },
    searchOrder: (state, action: PayloadAction<IOrders[]>) => {
      state.orders.ordersData.orders = action.payload;
    },
  },
});
export const {
  getReviewsForAdmin,
  searchReviews,
  getOrders,
  searchOrder,
  getUserQantity,
} = adminSlice.actions;
export default adminSlice.reducer;
