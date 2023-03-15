import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IUserProfile, IUserInitialState } from './interface.user';

const initialState: IUserInitialState = {
  userProfile: {} as IUserProfile,
  isError: false,
  isLoading: true,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,

  reducers: {
    getError: (state, action: PayloadAction<boolean>) => {
      state.isError = action.payload;
      state.isLoading = false;
    },
    getUser: (state, action: PayloadAction<IUserProfile | undefined>) => {
      // console.log('работает редюсер:', action);
      state.userProfile = action.payload;
      state.isLoading = false;
    },
    // нужен для очистки стейта userProfile, когда выходим из аккаунта
    clearUser: (state) => {
      state.userProfile = {} as IUserProfile;
    },
  },
});
export const { getUser, getError, clearUser } = userSlice.actions;
export default userSlice.reducer;
