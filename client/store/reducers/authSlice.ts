import { AppState } from './../store';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { HYDRATE } from 'next-redux-wrapper';

interface IauthData {
  user: {
    _id: string;
    email: string;
    isAdmin: boolean;
  };
  refreshToken: string;
  accessToken: string;
}

const initialState = {
  authData: {} as IauthData,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    authorization: (state, action: PayloadAction<IauthData>) => {
      state.authData = action.payload;
    },
    logaut: (state) => {
      state.authData = {} as IauthData;
    },
  },
  extraReducers: {
    [HYDRATE]: (state, action) => {
      // console.log('HYDRATE', action.payload);

      if (!action.payload.authReducer.authData) {
        return state;
      }

      state.authData = action.payload.authReducer.authData;
      // console.log('Стейт общий:', state.authData);
    },
  },
});

export const { authorization } = authSlice.actions;
export const selectProfile = (state: AppState) => state.authReducer;

export default authSlice.reducer;
