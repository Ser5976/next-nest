import { configureStore, ThunkAction, combineReducers } from '@reduxjs/toolkit';
import { createWrapper } from 'next-redux-wrapper';
import { Action } from 'redux';
import authReducer from './auth/authSlice';
import forCustomersReducer from './customers/customersSlice';
import categoryProducReducer from './category-product/catecoryProductSlice';
import productTypeReducer from './type-product/catecoryProductSlice';
import userReducer from './user/userSlice';

const rootReducer = combineReducers({
  authReducer,
  forCustomersReducer,
  categoryProducReducer,
  productTypeReducer,
  userReducer,
});

export const makeStore = () =>
  configureStore({
    reducer: rootReducer,
    devTools: true,
  });

//типизация стора
//export type AppDispatch = AppStore['dispatch'];

export type AppStore = ReturnType<typeof makeStore>;
export type AppState = ReturnType<AppStore['getState']>; // типизация общего стейта

export const wrapper = createWrapper<AppStore>(makeStore);
