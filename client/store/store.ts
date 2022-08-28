import { configureStore, ThunkAction, combineReducers } from '@reduxjs/toolkit';
import { createWrapper } from 'next-redux-wrapper';
import { Action } from 'redux';
import exampleReducer from './exampleSlice';
import authReducer from './auth/authSlice';

const rootReducer = combineReducers({
  exampleReducer,
  authReducer,
});

export const makeStore = () =>
  configureStore({
    reducer: rootReducer,
    devTools: true,
  });

//типизация стора
export type AppDispatch = AppStore['dispatch'];

export type AppStore = ReturnType<typeof makeStore>;
export type AppState = ReturnType<AppStore['getState']>; // типизация общего стейта
//export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, AppState, unknown, Action>;

export const wrapper = createWrapper<AppStore>(makeStore);
