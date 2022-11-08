import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IUser, IUserInitialState } from './interface.user';

const initialState: IUserInitialState = {
  user: {} as IUser,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,

  reducers: {
    getUser: (state, action: PayloadAction<IUser>) => {
      state.user = action.payload;
    },
  },
});
export const { getUser } = userSlice.actions;
export default userSlice.reducer;
