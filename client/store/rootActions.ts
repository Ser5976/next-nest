// импортируем все экшены
import * as authActions from './auth/authActoins';
import { getUser, getError, clearUser } from './user/userSlice';
import {
  getReviewsForAdmin,
  searchReviews,
  getOrders,
  searchOrder,
  getUserQantity,
} from './admin/adminSlice';

export const allActions = {
  ...authActions,
  getUser,
  getError,
  clearUser,
  getReviewsForAdmin,
  searchReviews,
  getOrders,
  searchOrder,
  getUserQantity,
};
