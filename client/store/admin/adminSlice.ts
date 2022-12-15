import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IAdminInitialState, IUsers } from './interface.admin';

const initialState: IAdminInitialState = {
  usersForAdmin: {
    users: {} as { users: IUsers[]; quantity: number },
  },
};

export const adminSlice = createSlice({
  name: 'admin',
  initialState,

  reducers: {
    getUsersForAdmin: (
      state,
      action: PayloadAction<{ users: IUsers[]; quantity: number }>
    ) => {
      // console.log('работает редюсер Admin Users:', action);
      state.usersForAdmin.users = action.payload;
    },
    searchUser: (state, action: PayloadAction<IUsers[]>) => {
      state.usersForAdmin.users.users = action.payload;
    },
  },
});
export const { getUsersForAdmin, searchUser } = adminSlice.actions;
export default adminSlice.reducer;
