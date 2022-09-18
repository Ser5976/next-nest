import { useRouter } from 'next/router';
import { FC, useEffect } from 'react';
import { useActions } from '../../store/useActions';
import { useData } from '../../store/useData';
import { TypeComponentAuthFields } from './auth.types';

//в этот провайдер будут попадать страницы, которые isOnlyAdmin или isOnlyUser
const CheckRole: FC<TypeComponentAuthFields> = ({
  children,
  Component: { isOnlyAdmin, isOnlyUser },
}) => {
  console.log('чек Рол');

  const { authReducer } = useData();

  const { user } = authReducer; // получаем user
  const router = useRouter();

  //первое условие,если у нас пользователь авторизован и он админ- то ограничений нет
  if (user?.isAdmin) return <>{children}</>;

  //второе условие,если первое условие не сработало,значит не админ
  //если страница мечена isOnlyAdmin ,значит её показывать нельзя,редеректим на страницу ошибки
  if (isOnlyAdmin) {
    router.pathname !== '/404' && router.replace('/404');
    return null;
  }
  // если пользователь авторизован  то сможет смотреть страницы isOnlyUser,
  //если не аторизован, страницы с isOnlyUser редиректим на страницу auth
  if (isOnlyUser && user && !user.isAdmin) return <>{children}</>;
  else {
    router.pathname !== '/auth' && router.replace('/auth');
    return null;
  }
};

export default CheckRole;
