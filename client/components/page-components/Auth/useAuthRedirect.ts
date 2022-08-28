import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useData } from '../../../store/auth/useData';

// хук ,который делает редирек
export const useAuthRedirect = () => {
  const { authReducer } = useData();

  const { query, push } = useRouter();

  const redirect = query.redirect ? String(query.redirect) : '/';

  useEffect(() => {
    if (authReducer.user) push(redirect);
  }, [authReducer.user, redirect, push]);
};
