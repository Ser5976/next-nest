export const API = {
  auth: {
    login: process.env.NEXT_PUBLIC_DOMAIN + '/api/auth/login',
    register: process.env.NEXT_PUBLIC_DOMAIN + '/api/auth/register',
    checkAuth: process.env.NEXT_PUBLIC_DOMAIN + '/api/auth/access-token',
  },
  customers: process.env.NEXT_PUBLIC_DOMAIN + '/api/for-customers',
};
