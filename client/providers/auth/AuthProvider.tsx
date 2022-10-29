import Cookies from 'js-cookie';
import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';
import { FC, useEffect } from 'react';
import { useActions } from '../../store/useActions';
import { TypeComponentAuthFields } from './auth.types';

const DynamicCheckRole = dynamic(() => import('./CheckRole'), { ssr: false }); //динамический импорт,
//отменяем серверный рендеринг компонента CheckRole, чтобы не  конфликтовать с сервером(данные по user,о них сервер не знает)

//ента основной провайдер
const AuthProvider: FC<TypeComponentAuthFields> = ({
  children,
  Component: { isOnlyAdmin, isOnlyUser },
}) => {
  const { pathname } = useRouter();
  const { checkAuth } = useActions();

  //  при загрузки проверяем если авторизован  запускаем checkAuth - проверяем валидность токенов,если всё норм обновляем токены
  //если нет делаем логаут
  useEffect(() => {
    // console.log('Привет я в провайдере ');
    const refreshToken = Cookies.get('refreshToken');
    if (refreshToken) {
      //  console.log('Привет я в провайдере чекаут');
      checkAuth();
    }
  }, [pathname]); // eslint-disable-line react-hooks/exhaustive-deps

  // и так если страницы не isOnlyAdmin, isOnlyUser, они ничем не ограничены,а если isOnlyAdmin или isOnlyUser ,
  //то их ограничит CheckRole провайдер
  return !isOnlyAdmin && !isOnlyUser ? (
    <>{children}</>
  ) : (
    <DynamicCheckRole Component={{ isOnlyAdmin, isOnlyUser }}>
      {children}
    </DynamicCheckRole>
  );
};

export default AuthProvider;
