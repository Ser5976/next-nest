// импортируем все экшены
import * as authActions from './auth/authActoins';
import { getUser, getError, clearUser } from './user/userSlice';
import { getUsersForAdmin, searchUser } from './admin/adminSlice';

export const allActions = {
  ...authActions,
  getUser,
  getError,
  clearUser,
  getUsersForAdmin,
  searchUser,
};
