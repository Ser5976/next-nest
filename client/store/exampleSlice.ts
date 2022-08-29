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

export const exampleSlice = createSlice({
  name: 'example',
  initialState,
  reducers: {
    example: (state, action: PayloadAction<IauthData>) => {
      state.authData = action.payload;
    },
    logaut: (state) => {
      state.authData = {} as IauthData;
    },
  },
  extraReducers: {
    [HYDRATE]: (state, action) => {
      // console.log('HYDRATE', action.payload);

      if (!action.payload.exampleReducer.authData) {
        return state;
      }

      state.authData = action.payload.example.authData;
      // console.log('Стейт общий:', state.authData);
    },
  },
});

export const { example } = exampleSlice.actions;

export default exampleSlice.reducer;
