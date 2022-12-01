import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IUserProfile, IUserInitialState } from './interface.user';

const initialState: IUserInitialState = {
  userProfile: {} as IUserProfile,
  isError: false,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,

  reducers: {
    getError: (state, action: PayloadAction<boolean>) => {
      state.isError = action.payload;
    },
    getUser: (state, action: PayloadAction<IUserProfile | undefined>) => {
      console.log('работает редюсер:', action);
      state.userProfile = action.payload;
    },
    // нужен для очистки стейта userProfile, когда выходим из аккаунта
    clearUser: (state) => {
      state.userProfile = {} as IUserProfile;
    },
  },
});
export const { getUser, getError, clearUser } = userSlice.actions;
export default userSlice.reducer;
