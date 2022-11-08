// импортируем все экшены
import * as authActions from './auth/authActoins';
import { getUser } from './user/userSlice';

export const allActions = {
  ...authActions,
  getUser: getUser,
};
