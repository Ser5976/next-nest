// импортируем все экшены
import * as authActions from './auth/authActoins';
import { getUser, getError, clearUser } from './user/userSlice';
import {
  getUserQantity,
  getReviewsQantity,
  getOrdersQantity,
} from './admin/adminSlice';

export const allActions = {
  ...authActions,
  getUser,
  getError,
  clearUser,
  getUserQantity,
  getOrdersQantity,
  getReviewsQantity,
};
