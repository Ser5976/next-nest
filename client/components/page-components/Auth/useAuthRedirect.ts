import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useData } from '../../../store/useData';

// хук ,который делает редирек
export const useAuthRedirect = () => {
  const { authReducer } = useData();

  const { query, push, back } = useRouter();

  const redirect = query.redirect && String(query.redirect);

  useEffect(() => {
    if (authReducer.user && redirect) {
      push(redirect);
      return;
    }
    if (authReducer.user) {
      console.log('редерект');
      back();
    }
  }, [authReducer.user, redirect, push]);
};
