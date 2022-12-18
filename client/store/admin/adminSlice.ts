import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  IAdminInitialState,
  IUsers,
  IReviewsForAdmin,
} from './interface.admin';

const initialState: IAdminInitialState = {
  usersForAdmin: {
    users: {} as { users: IUsers[]; quantity: number },
  },
  generalReviewsForAdmin: {
    reviewsForAdmin: {} as { allReviews: IReviewsForAdmin[]; quantity: number },
  },
};

export const adminSlice = createSlice({
  name: 'admin',
  initialState,

  reducers: {
    //...Users.....
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
    //...Reviews.....
    getReviewsForAdmin: (
      state,
      action: PayloadAction<{
        allReviews: IReviewsForAdmin[];
        quantity: number;
      }>
    ) => {
      state.generalReviewsForAdmin.reviewsForAdmin = action.payload;
    },
    searchReviews: (state, action: PayloadAction<IReviewsForAdmin[]>) => {
      state.generalReviewsForAdmin.reviewsForAdmin.allReviews = action.payload;
    },
  },
});
export const {
  getUsersForAdmin,
  searchUser,
  getReviewsForAdmin,
  searchReviews,
} = adminSlice.actions;
export default adminSlice.reducer;
