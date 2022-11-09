// импортируем все экшены
import * as authActions from './auth/authActoins';
import { getUser, getError } from './user/userSlice';

export const allActions = {
  ...authActions,
  getUser: getUser,
  getError: getError,
};
