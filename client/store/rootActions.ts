// импортируем все экшены
import * as authActions from './auth/authActoins';
import { getUser, getError, clearUser } from './user/userSlice';

export const allActions = {
  ...authActions,
  getUser: getUser,
  getError: getError,
  clearUser: clearUser,
};
