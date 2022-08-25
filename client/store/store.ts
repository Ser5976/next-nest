import { configureStore, ThunkAction, combineReducers } from '@reduxjs/toolkit';
import { createWrapper, MakeStore } from 'next-redux-wrapper';
import { Action } from 'redux';
import authReducer from './reducers/authSlice';

const rootReducer = combineReducers({
  authReducer,
});

export const makeStore = () =>
  configureStore({
    reducer: rootReducer,
    devTools: true,
  });

//export type AppDispatch = AppStore['dispatch'];

export type AppStore = ReturnType<typeof makeStore>;
export type AppState = ReturnType<AppStore['getState']>;
//export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, AppState, unknown, Action>;

export const wrapper = createWrapper<AppStore>(makeStore);
