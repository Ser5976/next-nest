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
  const { fetchForCustomers } = useActions();
  const { authReducer, forCustomersReducer } = useData();

  //-----------------------данные для Header----------------------------------//
  // Header  у нас присутствует во всех страницах, на страницах где отключен серверный рендеринг(админка,профайлы)
  // запросы на  данные в Header мы делаем из клиенты и записываем в редакс,
  // и наоборот если серверный рендеринг не отключен, запросы делаем из серверных функций и записываем в редакс.
  //при помощи CheckRole провайдера мы определяем страницы у которых нет серверного рендеринга и соотвественно
  //с этих страниц делаем запрос за данными и записываем в редакc, а Header берёт данные из редакса

  //forCustomers
  useEffect(() => {
    //если данные в сторе есть ,то запрос не делаем
    if (forCustomersReducer.forCustomers?.length === 0) {
      fetchForCustomers(); // активируем  экшен ,который делает запрос forCustomers и записывает данные в стор,
      //которые потом использует Header
    }
  }, [forCustomersReducer.forCustomers]);
  //----------------------------------------------------------//

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
