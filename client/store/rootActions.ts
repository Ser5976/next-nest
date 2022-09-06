// импортируем все экшены
import * as authActions from './auth/authActoins';
import * as customersActoins from './customers/customersActoins';

export const allActions = {
  ...authActions,
  ...customersActoins,
};
