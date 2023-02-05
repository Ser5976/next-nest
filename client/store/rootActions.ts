// импортируем все экшены
import * as authActions from './auth/authActoins';
import { getUser, getError, clearUser } from './user/userSlice';
import {
  getUserQuantity,
  getReviewsQuantity,
  getOrdersQuantity,
  getFreshOrdersQuantity,
  getFreshReviewsQuantity,
} from './admin/adminSlice';

export const allActions = {
  ...authActions,
  getUser,
  getError,
  clearUser,
  getUserQuantity,
  getOrdersQuantity,
  getReviewsQuantity,
  getFreshOrdersQuantity,
  getFreshReviewsQuantity,
};
