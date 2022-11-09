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
  },
});
export const { getUser, getError } = userSlice.actions;
export default userSlice.reducer;
